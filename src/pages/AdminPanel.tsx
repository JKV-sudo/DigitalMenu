import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
  const [loading, setLoading] = useState(true); // 🔄 Wait for Firebase
  const navigate = useNavigate();

  const ADMIN_UID = "P2dOECIAkVMaq3necemEfmaPUdH3"; // 🔥 Replace with your actual UID from Firebase

  useEffect(() => {
    const checkAdmin = async () => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          console.log("❌ Kein Benutzer eingeloggt.");
          alert("❌ Zugriff verweigert! Bitte einloggen.");
          navigate("/");
          return;
        }

        console.log("🔍 Eingeloggte UID:", user.uid); // Debugging output

        if (user.uid === ADMIN_UID) {
          setIsAdmin(true);
          console.log("✅ Admin erkannt!");
        } else {
          console.log("❌ UID stimmt nicht überein!");
          alert("❌ Keine Admin-Rechte!");
          navigate("/");
        }

        setLoading(false); // 🔄 Set loading state to false after check
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
    await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    setOrders(prevOrders =>
      prevOrders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm("Willst du diese Bestellung wirklich löschen?")) return;
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
              <p><strong>Status:</strong> {order.status}</p>
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
                <button onClick={() => updateStatus(order.id, "shipped")}>Als "Versandt" markieren</button>
                <button onClick={() => updateStatus(order.id, "delivered")}>Als "Geliefert" markieren</button>
                <button onClick={() => deleteOrder(order.id)} className="delete-btn">Bestellung löschen</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
