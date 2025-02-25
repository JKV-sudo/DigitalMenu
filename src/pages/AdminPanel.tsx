import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../AdminPanel.css";

interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: { name: string; price: number; quantity?: number }[];
  total: number;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const LOCAL_ADMIN_UID = "P2dOECIAkVMaq3necemEfmaPUdH3"; // 🔥 Lokale Admin-UID als Fallback

  useEffect(() => {
    const checkAdmin = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          alert("❌ Zugriff verweigert! Bitte einloggen.");
          navigate("/");
          return;
        }

        console.log("🔍 Eingeloggte UID:", user.uid);

        // 🔥 Prüfe zuerst Firestore, ob der User Admin ist
        try {
          const adminRef = doc(db, "admins", user.uid);
          const adminSnap = await getDoc(adminRef);

          if (adminSnap.exists() && adminSnap.data().isAdmin) {
            setIsAdmin(true);
            console.log("✅ Admin erkannt (Firestore)!");
          } else if (user.uid === LOCAL_ADMIN_UID) {
            setIsAdmin(true);
            console.log("✅ Admin erkannt (Lokaler Fallback)!");
          } else {
            alert("❌ Keine Admin-Rechte!");
            navigate("/");
          }
        } catch (error) {
          console.error("❌ Fehler beim Admin-Check:", error);
          if (user.uid === LOCAL_ADMIN_UID) {
            setIsAdmin(true);
            console.log("✅ Admin erkannt (Fallback wegen Firestore-Fehler)!");
          } else {
            alert("❌ Keine Admin-Rechte!");
            navigate("/");
          }
        }

        setLoading(false);
      });
    };

    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchOrders = async () => {
      setLoading(true);
      const ordersCollection = collection(db, "orders");
      const orderSnapshot = await getDocs(ordersCollection);
      const orderList = orderSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(orderList);
      setLoading(false);
    };

    fetchOrders();
  }, [isAdmin]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    if (!window.confirm(`Möchtest du diesen Auftrag als "${newStatus}" markieren?`)) return;
    await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    setOrders(prevOrders =>
      prevOrders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm("❌ Möchtest du diese Bestellung wirklich löschen?")) return;
    await deleteDoc(doc(db, "orders", orderId));
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  if (loading) return <p>⏳ Adminrechte werden überprüft...</p>;
  if (!isAdmin) return <p>❌ Zugriff verweigert.</p>;

  return (
    <div className="admin-container">
      <h1>✅ Admin Panel – Bestellungen</h1>
      {orders.length === 0 ? (
        <p>Keine Bestellungen gefunden.</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id} className="order-card">
              <h3>Bestellung von {order.customer.name}</h3>
              <p><strong>Adresse:</strong> {order.customer.address}</p>
              <p><strong>Telefon:</strong> {order.customer.phone}</p>
              <p>
                <strong>Status:</strong> 
                <span className={`status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              <p><strong>Gesamtbetrag:</strong> {order.total.toFixed(2)} €</p>

              <h4>Produkte:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.price.toFixed(2)} € {item.quantity ? `x${item.quantity}` : ""}
                  </li>
                ))}
              </ul>

              <div className="order-actions">
                {order.status === "pending" && (
                  <button className="shipped-btn" onClick={() => updateStatus(order.id, "shipped")}>
                    📦 Als "Versandt" markieren
                  </button>
                )}
                {order.status === "shipped" && (
                  <button className="delivered-btn" onClick={() => updateStatus(order.id, "delivered")}>
                    ✅ Als "Geliefert" markieren
                  </button>
                )}
                <button className="delete-btn" onClick={() => deleteOrder(order.id)}>❌ Bestellung löschen</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
