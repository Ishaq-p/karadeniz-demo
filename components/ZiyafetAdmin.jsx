"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, ShoppingBag, CalendarDays, BookOpen,
  Briefcase, Star, Users, BarChart3, Bell, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Search, Plus, Filter, Phone, Mail, MapPin, Clock,
  CheckCircle2, XCircle, AlertCircle, TrendingUp, Edit3, Trash2, ChevronDown,
  Award, Shield, UserCog, Menu as MenuIcon, X, PanelLeftClose, PanelLeft
} from "lucide-react";

/* ============================================================
   MOCK DATA
   ============================================================ */

const ORDERS = [
  { id: "ORD-2291", type: "Dine-in", table: "Table 12", items: "2× Kabuli Palaw, 1× Mantu", total: 64, status: "new", time: "2 min ago" },
  { id: "ORD-2290", type: "B2B", table: "Embassy of X", items: "Corporate catering, 40 guests", total: 1220, status: "new", time: "8 min ago" },
  { id: "ORD-2289", type: "Dine-in", table: "Table 4", items: "Chapli Kebab, 2× drinks", total: 38, status: "served", time: "22 min ago" },
  { id: "ORD-2288", type: "Delivery", table: "Online", items: "Ashak Platter, family size", total: 52, status: "complete", time: "41 min ago" },
  { id: "ORD-2287", type: "Dine-in", table: "Table 7", items: "Lamb Karahi, Naan ×3", total: 47, status: "served", time: "50 min ago" },
  { id: "ORD-2286", type: "Delivery", table: "Online", items: "Firni ×2, Chapli Kebab", total: 33, status: "complete", time: "1 hr ago" },
  { id: "ORD-2285", type: "Dine-in", table: "Table 2", items: "Borani Banjan, Palaw", total: 29, status: "complete", time: "1.4 hrs ago" },
  { id: "ORD-2284", type: "B2B", table: "TechNova Office", items: "Lunch catering, 18 guests", total: 540, status: "complete", time: "2 hrs ago" },
];

const RESERVATIONS = [
  { id: "RSV-441", name: "Aria Nazari", guests: 4, time: "7:00 PM", table: "Table 9", status: "confirmed", phone: "+93 78 111 2233" },
  { id: "RSV-442", name: "Wahid Rahimi", guests: 2, time: "7:30 PM", table: "Table 3", status: "confirmed", phone: "+93 79 222 4455" },
  { id: "RSV-443", name: "Embassy of France", guests: 12, time: "8:00 PM", table: "Private Suite", status: "pending", phone: "+93 70 333 6677" },
  { id: "RSV-444", name: "Laila Hashimi", guests: 6, time: "8:15 PM", table: "Table 14", status: "confirmed", phone: "+93 78 444 8899" },
  { id: "RSV-445", name: "Omar Sultani", guests: 2, time: "8:30 PM", table: "Table 1", status: "pending", phone: "+93 77 555 1122" },
  { id: "RSV-446", name: "Nadia Popal", guests: 8, time: "9:00 PM", table: "Table 20", status: "cancelled", phone: "+93 78 666 3344" },
];

const MENU_ITEMS = [
  { id: 1, name: "Kabuli Palaw", category: "Signature", price: 18, orders: 412, available: true },
  { id: 2, name: "Mantu & Ashak Platter", category: "For the Table", price: 14, orders: 298, available: true },
  { id: 3, name: "Chapli & Lamb Kebab", category: "Grill", price: 21, orders: 356, available: true },
  { id: 4, name: "Firni & Khajoor", category: "Sweet", price: 9, orders: 187, available: true },
  { id: 5, name: "Borani Banjan", category: "Vegetarian", price: 11, orders: 134, available: true },
  { id: 6, name: "Lamb Karahi", category: "Signature", price: 25, orders: 241, available: false },
  { id: 7, name: "Sabzi Chalaw", category: "Vegetarian", price: 13, orders: 98, available: true },
];

const B2B_ACCOUNTS = [
  { id: 1, name: "Embassy of France", contact: "Marie Dubois", orders: 6, mtdSpend: 4820, status: "active" },
  { id: 2, name: "TechNova Office", contact: "Sami Yousafi", orders: 9, mtdSpend: 3120, status: "active" },
  { id: 3, name: "Kabul Bank HQ", contact: "Zahra Ahmadi", orders: 4, mtdSpend: 2140, status: "active" },
  { id: 4, name: "UN Development Programme", contact: "James Okoye", orders: 3, mtdSpend: 1890, status: "pending" },
  { id: 5, name: "Roshan Telecom", contact: "Farid Karimi", orders: 2, mtdSpend: 960, status: "active" },
];

const REVIEWS = [
  { id: 1, name: "Sonia R.", rating: 5, text: "Best Kabuli Palaw in the city — the saffron rice was perfect and service felt genuinely warm.", date: "2 days ago" },
  { id: 2, name: "Daniyal K.", rating: 5, text: "Private dining suite made our anniversary unforgettable. Worth every afghani.", date: "4 days ago" },
  { id: 3, name: "Marie D.", rating: 4, text: "Excellent food, slightly slow on a Friday night but the kebab made up for it.", date: "1 week ago" },
  { id: 4, name: "Ahmad F.", rating: 5, text: "Chapli kebab is unmatched. Bringing my whole team next week.", date: "1 week ago" },
  { id: 5, name: "Layla S.", rating: 3, text: "Good food, but our reservation wasn't ready on time.", date: "2 weeks ago" },
];

const STAFF = [
  { id: 1, name: "Rashid Amiri", role: "General Manager", access: "Owner", status: "online" },
  { id: 2, name: "Fatima Noori", role: "Head Chef", access: "Kitchen", status: "online" },
  { id: 3, name: "Javed Stanikzai", role: "Floor Supervisor", access: "Front of House", status: "offline" },
  { id: 4, name: "Mariam Sadat", role: "Reservations Lead", access: "Front of House", status: "online" },
  { id: 5, name: "Hamid Yosufi", role: "B2B Accounts", access: "Sales", status: "offline" },
];

const WEEK_REVENUE = [
  { day: "Mon", h: 40 }, { day: "Tue", h: 55 }, { day: "Wed", h: 45 },
  { day: "Thu", h: 70 }, { day: "Fri", h: 85 }, { day: "Sat", h: 95 }, { day: "Sun", h: 60 }
];

const TOP_DISHES = [
  { name: "Kabuli Palaw", cat: "Signature", orders: 412, rev: 9888 },
  { name: "Chapli Kebab", cat: "Grill", orders: 356, rev: 7476 },
  { name: "Mantu & Ashak Platter", cat: "For the Table", orders: 298, rev: 5364 },
  { name: "Lamb Karahi", cat: "Signature", orders: 241, rev: 6025 },
];

/* ---- Analytics-specific datasets ---- */

const REVENUE_TREND_7W = [52, 61, 58, 70, 66, 78, 85];

const HOURLY_LOAD = [
  { hour: "11a", v: 12 }, { hour: "12p", v: 38 }, { hour: "1p", v: 52 },
  { hour: "2p", v: 30 }, { hour: "3p", v: 18 }, { hour: "4p", v: 14 },
  { hour: "5p", v: 22 }, { hour: "6p", v: 48 }, { hour: "7p", v: 74 },
  { hour: "8p", v: 96 }, { hour: "9p", v: 88 }, { hour: "10p", v: 55 },
  { hour: "11p", v: 24 }, { hour: "12a", v: 9 },
];

const CATEGORY_MIX = [
  { name: "Signature", pct: 34, rev: 20840, color: "gold" },
  { name: "Grill", pct: 26, rev: 15940, color: "turquoise" },
  { name: "For the Table", pct: 18, rev: 11020, color: "burgundy" },
  { name: "Vegetarian", pct: 12, rev: 7340, color: "ivoryDim" },
  { name: "Sweet", pct: 10, rev: 6120, color: "gold" },
];

const GUEST_FUNNEL = [
  { stage: "Site / App Visits", value: 8420, pct: 100 },
  { stage: "Reservation Started", value: 2104, pct: 25 },
  { stage: "Reservation Confirmed", value: 1682, pct: 20 },
  { stage: "Guest Seated", value: 1521, pct: 18 },
  { stage: "Returned Within 30 Days", value: 882, pct: 10.5 },
];

const CHANNEL_SPLIT = [
  { name: "Dine-in", pct: 54, color: "gold" },
  { name: "Delivery", pct: 24, color: "turquoise" },
  { name: "B2B Catering", pct: 22, color: "burgundy" },
];

const REGION_PERFORMANCE = [
  { area: "Shahr-e-Naw", orders: 612, rev: 18420, trend: "up" },
  { area: "Wazir Akbar Khan", orders: 340, rev: 11280, trend: "up" },
  { area: "Taimani", orders: 198, rev: 5640, trend: "down" },
  { area: "Karte Se", orders: 152, rev: 4120, trend: "up" },
  { area: "Qala-e-Fatullah", orders: 96, rev: 2980, trend: "flat" },
];

const RATING_DISTRIBUTION = [
  { stars: 5, count: 940 }, { stars: 4, count: 198 }, { stars: 3, count: 46 },
  { stars: 2, count: 14 }, { stars: 1, count: 6 },
];

const RESERVATION_TREND_8W = [28, 31, 26, 35, 33, 38, 34, 38];

const B2B_GROWTH_6M = [1200, 1850, 2400, 2980, 3550, 4180];

const STAFF_UTILIZATION = [
  { role: "Kitchen", coverage: 92 },
  { role: "Front of House", coverage: 78 },
  { role: "Reservations", coverage: 100 },
  { role: "Delivery Coordination", coverage: 65 },
];

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "reservations", label: "Reservations", icon: CalendarDays },
  { key: "menu", label: "Menu Manager", icon: BookOpen },
  { key: "b2b", label: "B2B Accounts", icon: Briefcase },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "staff", label: "Staff & Roles", icon: Users },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

/* ============================================================
   SMALL SHARED PIECES
   ============================================================ */

function StatusPill({ status }) {
  const map = {
    new: { cls: "status-new", label: "NEW" },
    served: { cls: "status-served", label: "SERVED" },
    complete: { cls: "status-complete", label: "COMPLETE" },
    confirmed: { cls: "status-served", label: "CONFIRMED" },
    pending: { cls: "status-new", label: "PENDING" },
    cancelled: { cls: "status-cancel", label: "CANCELLED" },
    active: { cls: "status-served", label: "ACTIVE" },
    online: { cls: "status-served", label: "ONLINE" },
    offline: { cls: "status-complete", label: "OFFLINE" },
  };
  const m = map[status] || map.complete;
  return <span className={`o-status ${m.cls}`}>{m.label}</span>;
}

function PanelHeader({ title, emphasis, action }) {
  return (
    <div className="panel-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{title} {emphasis && <em>{emphasis}</em>}</span>
      {action}
    </div>
  );
}

/* ---- analytics primitives ---- */

function HourlyHeat({ data }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div className="heat-row">
      {data.map(d => (
        <div className="heat-cell" key={d.hour} title={`${d.hour}: ${d.v} covers`}>
          <div className="heat-block" style={{ opacity: 0.15 + (d.v / max) * 0.85 }} />
          <span className="heat-label">{d.hour}</span>
        </div>
      ))}
    </div>
  );
}

function HBar({ label, pct, value, colorVar = "gold-bright", sub }) {
  return (
    <div className="hbar-row">
      <div className="hbar-top">
        <span className="hbar-label">{label}</span>
        <span className="hbar-value">{value !== undefined ? value : `${pct}%`}</span>
      </div>
      <div className="hbar-track">
        <div className="hbar-fill" style={{ width: `${pct}%`, background: `var(--${colorVar})` }} />
      </div>
      {sub && <div className="hbar-sub">{sub}</div>}
    </div>
  );
}

function Funnel({ steps }) {
  const max = steps[0].value;
  return (
    <div className="funnel">
      {steps.map((s, idx) => (
        <div className="funnel-row" key={s.stage}>
          <div className="funnel-label">{s.stage}</div>
          <div className="funnel-track">
            <div className="funnel-fill" style={{ width: `${(s.value / max) * 100}%` }}>
              <span className="funnel-value">{s.value.toLocaleString()}</span>
            </div>
          </div>
          <div className="funnel-pct">{s.pct}%</div>
        </div>
      ))}
    </div>
  );
}

function Sparkline({ data, colorVar = "gold-bright" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 28 - ((v - min) / range) * 26;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg className="spark" viewBox="0 0 100 28" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={`var(--${colorVar})`} strokeWidth="2" />
    </svg>
  );
}

/* ============================================================
   TAB: DASHBOARD
   ============================================================ */

function DashboardTab() {
  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Revenue Today</div>
          <div className="kpi-value">$4,280</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 12% vs last Tue</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Reservations</div>
          <div className="kpi-value">38</div>
          <div className="kpi-trend trend-neutral"><ArrowUpRight size={14} /> 6 pending confirm</div>
        </div>
        <div className="panel">
          <div className="kpi-label">B2B Orders (MTD)</div>
          <div className="kpi-value">14</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 3 new corporate</div>
        </div>
        <div className="panel">
          <div className="kpi-label">No-Show Rate</div>
          <div className="kpi-value">4.1%</div>
          <div className="kpi-trend trend-down"><ArrowDownRight size={14} /> 2.3pt vs last month</div>
        </div>
      </div>

      <div className="middle-row">
        <div className="panel">
          <PanelHeader title="Revenue by Day —" emphasis="This Week" />
          <div className="chart-container">
            {WEEK_REVENUE.map((d) => (
              <div className="chart-col" key={d.day}>
                <div className="chart-bar" style={{ height: `${d.h}%` }}></div>
                <div className="chart-label">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <PanelHeader title="Live Orders" />
          <div className="order-list">
            {ORDERS.slice(0, 4).map((o) => (
              <div className="order-item" key={o.id}>
                <div>
                  <div className="o-main">{o.table} — {o.type}</div>
                  <div className="o-sub">{o.items}</div>
                </div>
                <div className="o-right">
                  <div className="o-price">${o.total}</div>
                  <StatusPill status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader
          title="Top Performing Dishes —"
          emphasis="Last 30 Days"
          action={<MoreHorizontal size={20} color="rgba(243,234,217,0.5)" style={{ cursor: "pointer" }} />}
        />
        <table className="data-table">
          <thead>
            <tr><th>Dish</th><th>Category</th><th>Orders</th><th className="th-rev">Revenue</th></tr>
          </thead>
          <tbody>
            {TOP_DISHES.map((d) => (
              <tr key={d.name}>
                <td className="td-name">{d.name}</td>
                <td className="td-cat">{d.cat}</td>
                <td className="td-orders">{d.orders}</td>
                <td className="td-rev">${d.rev.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: ORDERS
   ============================================================ */

function OrdersTab() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ORDERS : ORDERS.filter(o => o.status === filter);
  const filters = ["all", "new", "served", "complete"];

  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Orders Today</div>
          <div className="kpi-value">{ORDERS.length}</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 18% vs yesterday</div>
        </div>
        <div className="panel">
          <div className="kpi-label">New / Unconfirmed</div>
          <div className="kpi-value">{ORDERS.filter(o => o.status === "new").length}</div>
          <div className="kpi-trend trend-neutral"><AlertCircle size={14} /> Needs attention</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Avg. Order Value</div>
          <div className="kpi-value">$126</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> Boosted by B2B</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Delivery Share</div>
          <div className="kpi-value">27%</div>
          <div className="kpi-trend trend-neutral"><TrendingUp size={14} /> Steady this week</div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Order Volume by Hour —" emphasis="Today" />
        <HourlyHeat data={HOURLY_LOAD} />
      </div>

      <div className="panel">
        <div className="panel-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span>All Orders</span>
          <div className="filter-row">
            {filters.map(f => (
              <button key={f} className={`chip ${filter === f ? "chip-active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Order</th><th>Source</th><th>Items</th><th>Time</th><th className="th-rev">Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="td-name">{o.id}</td>
                <td className="td-cat">{o.table} <span style={{ opacity: 0.5 }}>· {o.type}</span></td>
                <td className="td-cat">{o.items}</td>
                <td className="td-cat">{o.time}</td>
                <td className="td-rev">${o.total}</td>
                <td><StatusPill status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: RESERVATIONS
   ============================================================ */

function ReservationsTab() {
  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Tonight's Bookings</div>
          <div className="kpi-value">{RESERVATIONS.length}</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> Fully booked by 8PM</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Total Guests</div>
          <div className="kpi-value">{RESERVATIONS.reduce((s, r) => s + r.guests, 0)}</div>
          <div className="kpi-trend trend-neutral"><Users size={14} /> Across all tables</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Pending Confirm</div>
          <div className="kpi-value">{RESERVATIONS.filter(r => r.status === "pending").length}</div>
          <div className="kpi-trend trend-neutral"><AlertCircle size={14} /> Awaiting reply</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Private Suite</div>
          <div className="kpi-value">Booked</div>
          <div className="kpi-trend trend-up"><CheckCircle2 size={14} /> 8:00 PM · 12 guests</div>
        </div>
      </div>

      <div className="middle-row">
        <div className="panel">
          <PanelHeader title="Weekly Bookings —" emphasis="Last 8 Weeks" />
          <div className="chart-container">
            {RESERVATION_TREND_8W.map((v, idx) => (
              <div className="chart-col" key={idx}>
                <div className="chart-bar" style={{ height: `${(v / 40) * 100}%` }}></div>
                <div className="chart-label">W{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <PanelHeader title="Booking Health" />
          <div className="hbar-list">
            <HBar label="Confirmed" pct={72} value="72%" colorVar="turquoise-bright" />
            <HBar label="Pending" pct={18} value="18%" colorVar="gold-bright" />
            <HBar label="Cancelled / No-show" pct={10} value="10%" colorVar="danger" />
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader
          title="Reservation Book —"
          emphasis="Tonight"
          action={<button className="btn-mini"><Plus size={14} /> New Reservation</button>}
        />
        <table className="data-table">
          <thead>
            <tr><th>Guest</th><th>Party</th><th>Time</th><th>Table</th><th>Contact</th><th>Status</th></tr>
          </thead>
          <tbody>
            {RESERVATIONS.map((r) => (
              <tr key={r.id}>
                <td className="td-name">{r.name}</td>
                <td className="td-cat">{r.guests} guests</td>
                <td className="td-cat"><Clock size={12} style={{ marginRight: 6, verticalAlign: -1 }} />{r.time}</td>
                <td className="td-cat">{r.table}</td>
                <td className="td-cat">{r.phone}</td>
                <td><StatusPill status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: MENU MANAGER
   ============================================================ */

function MenuManagerTab() {
  const [items, setItems] = useState(MENU_ITEMS);
  const toggleAvailable = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, available: !i.available } : i));
  };

  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Active Dishes</div>
          <div className="kpi-value">{items.filter(i => i.available).length}</div>
          <div className="kpi-trend trend-up"><CheckCircle2 size={14} /> Live on menu</div>
        </div>
        <div className="panel">
          <div className="kpi-label">86'd Items</div>
          <div className="kpi-value">{items.filter(i => !i.available).length}</div>
          <div className="kpi-trend trend-down"><XCircle size={14} /> Out of stock</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Best Seller</div>
          <div className="kpi-value" style={{ fontSize: 20 }}>Kabuli Palaw</div>
          <div className="kpi-trend trend-neutral"><Award size={14} /> 412 orders MTD</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Avg. Dish Price</div>
          <div className="kpi-value">${(items.reduce((s, i) => s + i.price, 0) / items.length).toFixed(0)}</div>
          <div className="kpi-trend trend-neutral"><TrendingUp size={14} /> Across menu</div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Revenue Share by Category —" emphasis="MTD" />
        <div className="hbar-list">
          {CATEGORY_MIX.map(c => (
            <HBar key={c.name} label={c.name} pct={c.pct}
              value={`$${c.rev.toLocaleString()}`}
              colorVar={c.color === "gold" ? "gold-bright" : c.color === "turquoise" ? "turquoise-bright" : c.color === "burgundy" ? "burgundy-accent" : "ivory-dim"} />
          ))}
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Menu Items" action={<button className="btn-mini"><Plus size={14} /> Add Dish</button>} />
        <table className="data-table">
          <thead>
            <tr><th>Dish</th><th>Category</th><th>Price</th><th>Orders MTD</th><th>Availability</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td className="td-name">{i.name}</td>
                <td className="td-cat">{i.category}</td>
                <td className="td-rev">${i.price}</td>
                <td className="td-orders">{i.orders}</td>
                <td>
                  <button className={`toggle ${i.available ? "toggle-on" : ""}`} onClick={() => toggleAvailable(i.id)}>
                    <span className="toggle-dot" />
                  </button>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Edit3 size={14} color="rgba(243,234,217,0.5)" style={{ cursor: "pointer" }} />
                    <Trash2 size={14} color="rgba(243,234,217,0.5)" style={{ cursor: "pointer" }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: B2B ACCOUNTS
   ============================================================ */

function B2BTab() {
  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Active Accounts</div>
          <div className="kpi-value">{B2B_ACCOUNTS.filter(a => a.status === "active").length}</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 1 new this month</div>
        </div>
        <div className="panel">
          <div className="kpi-label">MTD B2B Revenue</div>
          <div className="kpi-value">${B2B_ACCOUNTS.reduce((s, a) => s + a.mtdSpend, 0).toLocaleString()}</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 22% of total revenue</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Pending Approvals</div>
          <div className="kpi-value">{B2B_ACCOUNTS.filter(a => a.status === "pending").length}</div>
          <div className="kpi-trend trend-neutral"><AlertCircle size={14} /> UNDP awaiting contract</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Top Account</div>
          <div className="kpi-value" style={{ fontSize: 20 }}>Embassy of France</div>
          <div className="kpi-trend trend-neutral"><Briefcase size={14} /> $4,820 MTD</div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="B2B Revenue Growth —" emphasis="Last 6 Months" />
        <div className="chart-container">
          {B2B_GROWTH_6M.map((v, idx) => (
            <div className="chart-col" key={idx}>
              <div className="chart-bar" style={{ height: `${(v / 4200) * 100}%` }}></div>
              <div className="chart-label">M{idx + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Corporate Accounts" action={<button className="btn-mini"><Plus size={14} /> Add Account</button>} />
        <table className="data-table">
          <thead>
            <tr><th>Company</th><th>Contact</th><th>Orders MTD</th><th className="th-rev">MTD Spend</th><th>Status</th></tr>
          </thead>
          <tbody>
            {B2B_ACCOUNTS.map((a) => (
              <tr key={a.id}>
                <td className="td-name">{a.name}</td>
                <td className="td-cat">{a.contact}</td>
                <td className="td-orders">{a.orders}</td>
                <td className="td-rev">${a.mtdSpend.toLocaleString()}</td>
                <td><StatusPill status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: REVIEWS
   ============================================================ */

function ReviewsTab() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Average Rating</div>
          <div className="kpi-value">{avg}★</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> Up from 4.7 last month</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Total Reviews</div>
          <div className="kpi-value">1,204</div>
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 31 new this week</div>
        </div>
        <div className="panel">
          <div className="kpi-label">5-Star Share</div>
          <div className="kpi-value">78%</div>
          <div className="kpi-trend trend-neutral"><Star size={14} /> Consistent quality</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Response Rate</div>
          <div className="kpi-value">92%</div>
          <div className="kpi-trend trend-up"><CheckCircle2 size={14} /> Above industry avg</div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Rating Distribution —" emphasis="All Time" />
        <div className="hbar-list">
          {RATING_DISTRIBUTION.map(r => {
            const total = RATING_DISTRIBUTION.reduce((s, x) => s + x.count, 0);
            const pct = Math.round((r.count / total) * 100);
            return (
              <HBar key={r.stars} label={`${r.stars}★`} pct={pct} value={`${r.count} reviews`}
                colorVar={r.stars >= 4 ? "turquoise-bright" : r.stars === 3 ? "gold-bright" : "danger"} />
            );
          })}
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Recent Reviews" />
        <div className="review-list">
          {REVIEWS.map((r) => (
            <div className="review-item" key={r.id}>
              <div className="review-top">
                <div className="review-name">{r.name}</div>
                <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              </div>
              <div className="review-text">{r.text}</div>
              <div className="review-date">{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: STAFF & ROLES
   ============================================================ */

function StaffTab() {
  return (
    <div className="dashboard-grid">
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">Total Staff</div>
          <div className="kpi-value">{STAFF.length}</div>
          <div className="kpi-trend trend-neutral"><Users size={14} /> Across all roles</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Online Now</div>
          <div className="kpi-value">{STAFF.filter(s => s.status === "online").length}</div>
          <div className="kpi-trend trend-up"><CheckCircle2 size={14} /> Active shift</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Owner Access</div>
          <div className="kpi-value">1</div>
          <div className="kpi-trend trend-neutral"><Shield size={14} /> Full permissions</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Roles Defined</div>
          <div className="kpi-value">5</div>
          <div className="kpi-trend trend-neutral"><UserCog size={14} /> Custom access tiers</div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Shift Coverage —" emphasis="This Week" />
        <div className="hbar-list">
          {STAFF_UTILIZATION.map(s => (
            <HBar key={s.role} label={s.role} pct={s.coverage} value={`${s.coverage}%`}
              colorVar={s.coverage >= 85 ? "turquoise-bright" : s.coverage >= 70 ? "gold-bright" : "danger"} />
          ))}
        </div>
      </div>

      <div className="panel">
        <PanelHeader title="Team Members" action={<button className="btn-mini"><Plus size={14} /> Invite Staff</button>} />
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Role</th><th>Access Level</th><th>Status</th></tr>
          </thead>
          <tbody>
            {STAFF.map((s) => (
              <tr key={s.id}>
                <td className="td-name">{s.name}</td>
                <td className="td-cat">{s.role}</td>
                <td className="td-cat">{s.access}</td>
                <td><StatusPill status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   TAB: ANALYTICS
   ============================================================ */

function AnalyticsTab() {
  return (
    <div className="dashboard-grid">
      {/* Top-line KPIs with sparklines */}
      <div className="kpi-row">
        <div className="panel">
          <div className="kpi-label">MTD Revenue</div>
          <div className="kpi-value">$61,240</div>
          <Sparkline data={REVENUE_TREND_7W} colorVar="turquoise-bright" />
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> 14% vs last month</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Repeat Guest Rate</div>
          <div className="kpi-value">58%</div>
          <Sparkline data={[41, 44, 47, 49, 52, 55, 58]} colorVar="gold-bright" />
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> Loyalty improving</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Avg. Check Size</div>
          <div className="kpi-value">$41.20</div>
          <Sparkline data={[36, 37, 38, 39, 40, 41, 41.2]} colorVar="gold-bright" />
          <div className="kpi-trend trend-up"><ArrowUpRight size={14} /> Up $3.10 vs Q1</div>
        </div>
        <div className="panel">
          <div className="kpi-label">Platform Uptime</div>
          <div className="kpi-value">99.98%</div>
          <Sparkline data={[99.9, 100, 99.95, 100, 99.98, 100, 99.98]} colorVar="turquoise-bright" />
          <div className="kpi-trend trend-up"><CheckCircle2 size={14} /> Last 30 days</div>
        </div>
      </div>

      {/* Revenue trend + Channel mix */}
      <div className="middle-row">
        <div className="panel">
          <PanelHeader title="Revenue Trend —" emphasis="Last 7 Weeks" />
          <div className="chart-container">
            {REVENUE_TREND_7W.map((h, idx) => (
              <div className="chart-col" key={idx}>
                <div className="chart-bar" style={{ height: `${h}%` }}></div>
                <div className="chart-label">W{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <PanelHeader title="Channel Mix" />
          <div className="donut-wrap">
            <svg viewBox="0 0 42 42" className="donut">
              {(() => {
                let offset = 0;
                const colors = { gold: "var(--gold-bright)", turquoise: "var(--turquoise-bright)", burgundy: "#c65a5a" };
                return CHANNEL_SPLIT.map((c) => {
                  const dash = `${c.pct} ${100 - c.pct}`;
                  const el = (
                    <circle key={c.name} cx="21" cy="21" r="15.9" fill="transparent"
                      stroke={colors[c.color]} strokeWidth="6"
                      strokeDasharray={dash} strokeDashoffset={-offset} />
                  );
                  offset += c.pct;
                  return el;
                });
              })()}
            </svg>
            <div className="donut-legend">
              {CHANNEL_SPLIT.map(c => (
                <div className="legend-row" key={c.name}>
                  <span className={`legend-dot dot-${c.color}`} />
                  <span className="legend-label">{c.name}</span>
                  <span className="legend-pct">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly heatmap */}
      <div className="panel">
        <PanelHeader title="Guest Load by Hour —" emphasis="Avg. Weekday" />
        <HourlyHeat data={HOURLY_LOAD} />
        <div className="heat-footnote">Darker = busier. Peak covers at 8–9 PM, second wave at lunch 1 PM.</div>
      </div>

      {/* Category performance + Guest funnel */}
      <div className="middle-row">
        <div className="panel">
          <PanelHeader title="Category Performance —" emphasis="MTD" />
          <div className="hbar-list">
            {CATEGORY_MIX.map(c => (
              <HBar key={c.name} label={c.name} pct={c.pct}
                value={`$${c.rev.toLocaleString()}`}
                colorVar={c.color === "gold" ? "gold-bright" : c.color === "turquoise" ? "turquoise-bright" : c.color === "burgundy" ? "burgundy-accent" : "ivory-dim"} />
            ))}
          </div>
        </div>
        <div className="panel">
          <PanelHeader title="Guest Funnel —" emphasis="Last 30 Days" />
          <Funnel steps={GUEST_FUNNEL} />
        </div>
      </div>

      {/* Regional performance */}
      <div className="panel">
        <PanelHeader title="Delivery Performance by Area —" emphasis="MTD" />
        <table className="data-table">
          <thead>
            <tr><th>Area</th><th>Orders</th><th className="th-rev">Revenue</th><th>Trend</th></tr>
          </thead>
          <tbody>
            {REGION_PERFORMANCE.map(r => (
              <tr key={r.area}>
                <td className="td-name">{r.area}</td>
                <td className="td-orders">{r.orders}</td>
                <td className="td-rev">${r.rev.toLocaleString()}</td>
                <td>
                  {r.trend === "up" && <span className="trend-up trend-icon"><ArrowUpRight size={14} /> Growing</span>}
                  {r.trend === "down" && <span className="trend-down trend-icon"><ArrowDownRight size={14} /> Declining</span>}
                  {r.trend === "flat" && <span className="trend-neutral trend-icon">Stable</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <PanelHeader title="Top Performing Dishes —" emphasis="Last 30 Days" />
        <table className="data-table">
          <thead>
            <tr><th>Dish</th><th>Category</th><th>Orders</th><th className="th-rev">Revenue</th></tr>
          </thead>
          <tbody>
            {TOP_DISHES.map((d) => (
              <tr key={d.name}>
                <td className="td-name">{d.name}</td>
                <td className="td-cat">{d.cat}</td>
                <td className="td-orders">{d.orders}</td>
                <td className="td-rev">${d.rev.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */

export default function ZiyafatAdmin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);   // desktop retract
  const [mobileOpen, setMobileOpen] = useState(false);  // mobile drawer

  const goTab = (key) => {
    setActiveTab(key);
    setMobileOpen(false); // close drawer after picking a tab on mobile
  };

  const TITLES = {
    dashboard: ["Overview", "Today"],
    orders: ["Orders", "Live"],
    reservations: ["Reservations", "Tonight"],
    menu: ["Menu Manager", "Live Menu"],
    b2b: ["B2B Accounts", "Corporate"],
    reviews: ["Reviews", "Guest Feedback"],
    staff: ["Staff & Roles", "Team"],
    analytics: ["Analytics", "Performance"],
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />;
      case "orders": return <OrdersTab />;
      case "reservations": return <ReservationsTab />;
      case "menu": return <MenuManagerTab />;
      case "b2b": return <B2BTab />;
      case "reviews": return <ReviewsTab />;
      case "staff": return <StaffTab />;
      case "analytics": return <AnalyticsTab />;
      default: return <DashboardTab />;
    }
  };

  const [title, emphasis] = TITLES[activeTab];

  return (
    <div className="admin-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Jost:wght@300;400;500;600&display=swap');

        .admin-root {
          --burgundy: #6e1a1f; --burgundy-deep: #4a1014; --burgundy-accent: #c65a5a;
          --walnut: #241209; --walnut-deep: #170a04;
          --navy: #1c2438; --ivory: #f3ead9; --ivory-deep: #e8dcc2; --ivory-dim: #a89a86;
          --turquoise: #2c8c86; --turquoise-bright: #3fb0a8;
          --gold: #c9973f; --gold-bright: #e3b158;
          --danger: #e96d71;

          font-family: 'Jost', sans-serif;
          min-height: 100vh;
          display: flex;
          background: var(--walnut-deep);
          color: var(--ivory);
        }

        .admin-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: .04; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .sidebar {
          width: 260px;
          background: var(--walnut);
          border-right: 1px solid rgba(201,151,63,0.2);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: width 0.3s var(--ease, ease), transform 0.3s var(--ease, ease);
          overflow: hidden;
        }
        .sidebar.collapsed { width: 76px; }
        .sidebar.collapsed .brand-block,
        .sidebar.collapsed .sidebar-footer,
        .sidebar.collapsed .nav-item-label { display: none; }
        .sidebar.collapsed .sidebar-header-row { justify-content: center; }
        .sidebar.collapsed .nav-item { justify-content: center; padding: 12px; }
        .sidebar.collapsed .nav-item.active { clip-path: none; }

        .sidebar-header { padding: 24px 20px; border-bottom: 1px solid rgba(201,151,63,0.15); }
        .sidebar-header-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .brand-logo { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 500; letter-spacing: 0.1em; color: var(--ivory); line-height: 1.2; white-space: nowrap; }
        .brand-logo span { color: var(--gold-bright); }
        .brand-sub { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--gold); margin-top: 4px; white-space: nowrap; }

        .collapse-btn {
          background: transparent; border: 1px solid rgba(201,151,63,0.3); color: var(--gold-bright);
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0; transition: all 0.2s;
        }
        .collapse-btn:hover { background: rgba(201,151,63,0.15); border-color: var(--gold); }

        .nav-menu { padding: 24px 12px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .nav-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 16px;
          color: rgba(243,234,217,0.6); font-size: 13px; font-weight: 500; text-transform: uppercase;
          letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent;
          background: transparent; border-top: none; border-right: none; border-bottom: none; width: 100%; text-align: left;
          white-space: nowrap;
        }
        .nav-item:hover { color: var(--ivory); background: rgba(255,255,255,0.02); }
        .nav-item.active { background: var(--gold-bright); color: var(--walnut-deep); font-weight: 600; clip-path: polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px); }

        .sidebar-footer { padding: 20px 24px; border-top: 1px solid rgba(201,151,63,0.15); font-size: 11px; color: rgba(243,234,217,0.4); letter-spacing: 0.05em; white-space: nowrap; }

        .sidebar-scrim { display: none; }

        .main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; height: 100vh; min-width: 0; }
        .topbar { padding: 32px 48px 24px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
        .topbar-left { display: flex; align-items: center; gap: 16px; }
        .page-title { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 400; color: var(--ivory); }
        .page-title em { font-style: italic; color: var(--gold-bright); }
        .topbar-actions { display: flex; align-items: center; gap: 16px; }

        .burger-btn {
          background: var(--walnut); border: 1px solid rgba(201,151,63,0.3); color: var(--gold-bright);
          width: 40px; height: 40px; display: none; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0; transition: all 0.2s;
        }
        .burger-btn:hover { background: rgba(201,151,63,0.15); border-color: var(--gold); }

        .mobile-only { display: none; }
        .desktop-only { display: flex; }
        .badge-owner {
          background: rgba(201,151,63,0.15); color: var(--gold-bright); border: 1px solid var(--gold);
          padding: 6px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
        }

        .dashboard-grid { padding: 0 48px 48px; display: flex; flex-direction: column; gap: 24px; }

        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .panel {
          background: var(--walnut); border: 1px solid rgba(201,151,63,0.25); padding: 24px; position: relative;
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
        }
        .panel::before { content: ''; position: absolute; top: 0; left: 16px; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold), var(--turquoise-bright), var(--gold)); }

        .kpi-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(243,234,217,0.6); margin-bottom: 8px; }
        .kpi-value { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 500; color: var(--ivory); margin-bottom: 12px; }
        .kpi-trend { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; }
        .trend-up { color: var(--turquoise-bright); }
        .trend-down { color: #e96d71; }
        .trend-neutral { color: var(--gold-bright); }

        .middle-row { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .panel-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 500; color: var(--ivory); margin-bottom: 24px; }
        .panel-title em { font-style: italic; color: var(--gold-bright); }

        .chart-container { height: 200px; display: flex; align-items: flex-end; gap: 12px; padding-top: 20px; border-bottom: 1px solid rgba(243,234,217,0.1); }
        .chart-col { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 8px; }
        .chart-bar { width: 100%; background: linear-gradient(180deg, var(--gold) 0%, rgba(201,151,63,0.1) 100%); border-top: 2px solid var(--gold-bright); transition: height 0.4s; }
        .chart-label { font-size: 11px; color: rgba(243,234,217,0.5); text-transform: uppercase; }

        .order-list { display: flex; flex-direction: column; gap: 16px; }
        .order-item { display: flex; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid rgba(243,234,217,0.08); }
        .order-item:last-child { border-bottom: none; padding-bottom: 0; }
        .o-main { font-weight: 600; font-size: 14px; color: var(--ivory); margin-bottom: 4px; }
        .o-sub { font-size: 12px; color: rgba(243,234,217,0.5); }
        .o-right { text-align: right; }
        .o-price { font-family: 'Fraunces', serif; font-size: 15px; color: var(--gold-bright); font-weight: 500; margin-bottom: 6px; }
        .o-status { display: inline-block; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 8px; border: 1px solid; }
        .status-new { color: var(--gold-bright); border-color: rgba(227,177,88,0.3); background: rgba(227,177,88,0.1); }
        .status-served { color: var(--turquoise-bright); border-color: rgba(63,176,168,0.3); background: rgba(63,176,168,0.1); }
        .status-complete { color: rgba(243,234,217,0.6); border-color: rgba(243,234,217,0.2); }
        .status-cancel { color: #e96d71; border-color: rgba(233,109,113,0.3); background: rgba(233,109,113,0.1); }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(243,234,217,0.5); padding: 0 16px 16px; border-bottom: 1px solid rgba(201,151,63,0.3); }
        .data-table td { padding: 16px; font-size: 14px; border-bottom: 1px solid rgba(243,234,217,0.06); }
        .data-table tr:last-child td { border-bottom: none; }
        .td-name { font-weight: 500; color: var(--ivory); }
        .td-cat { color: rgba(243,234,217,0.6); }
        .td-orders { color: var(--ivory); }
        .td-rev { font-family: 'Fraunces', serif; font-weight: 600; color: var(--gold-bright); text-align: right; }
        .th-rev { text-align: right !important; }

        .filter-row { display: flex; gap: 8px; }
        .chip {
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; padding: 7px 14px;
          background: rgba(243,234,217,0.05); border: 1px solid rgba(201,151,63,0.25); color: rgba(243,234,217,0.6);
          cursor: pointer; transition: all 0.2s;
        }
        .chip:hover { color: var(--ivory); border-color: var(--gold); }
        .chip-active { background: var(--gold-bright); color: var(--walnut-deep); border-color: var(--gold-bright); font-weight: 600; }

        .btn-mini {
          display: flex; align-items: center; gap: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
          padding: 9px 16px; background: var(--gold-bright); color: var(--walnut-deep); border: none; font-weight: 600;
          cursor: pointer; transition: all 0.2s; clip-path: polygon(6px 0, 100% 0, 100% 100%, 0 100%, 0 6px);
        }
        .btn-mini:hover { background: var(--turquoise-bright); color: var(--ivory); }

        .toggle { width: 38px; height: 20px; background: rgba(243,234,217,0.15); border: none; position: relative; cursor: pointer; padding: 0; transition: background 0.2s; }
        .toggle-on { background: var(--turquoise-bright); }
        .toggle-dot { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: var(--ivory); transition: left 0.2s; }
        .toggle-on .toggle-dot { left: 20px; }

        .review-list { display: flex; flex-direction: column; gap: 20px; }
        .review-item { padding-bottom: 20px; border-bottom: 1px solid rgba(243,234,217,0.08); }
        .review-item:last-child { border-bottom: none; padding-bottom: 0; }
        .review-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .review-name { font-weight: 600; font-size: 14px; color: var(--ivory); }
        .review-stars { color: var(--gold-bright); font-size: 13px; letter-spacing: 2px; }
        .review-text { font-size: 13px; color: rgba(243,234,217,0.7); line-height: 1.6; margin-bottom: 8px; }
        .review-date { font-size: 11px; color: rgba(243,234,217,0.4); text-transform: uppercase; letter-spacing: 0.06em; }

        /* ---- sparkline ---- */
        .spark { width: 100%; height: 28px; display: block; margin-bottom: 10px; opacity: 0.85; }

        /* ---- hourly heatmap ---- */
        .heat-row { display: flex; gap: 6px; align-items: flex-end; }
        .heat-cell { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .heat-block { width: 100%; height: 46px; background: var(--gold-bright); border-radius: 2px; transition: opacity 0.3s; }
        .heat-label { font-size: 10px; color: rgba(243,234,217,0.45); text-transform: uppercase; }
        .heat-footnote { margin-top: 16px; font-size: 12px; color: rgba(243,234,217,0.45); font-style: italic; }

        /* ---- horizontal bars ---- */
        .hbar-list { display: flex; flex-direction: column; gap: 18px; }
        .hbar-row { display: flex; flex-direction: column; gap: 6px; }
        .hbar-top { display: flex; justify-content: space-between; font-size: 13px; }
        .hbar-label { color: var(--ivory); font-weight: 500; }
        .hbar-value { color: rgba(243,234,217,0.6); font-family: 'Fraunces', serif; }
        .hbar-track { width: 100%; height: 8px; background: rgba(243,234,217,0.08); border-radius: 2px; overflow: hidden; }
        .hbar-fill { height: 100%; border-radius: 2px; transition: width 0.5s var(--ease, ease); }
        .hbar-sub { font-size: 11px; color: rgba(243,234,217,0.4); }

        /* ---- funnel ---- */
        .funnel { display: flex; flex-direction: column; gap: 14px; }
        .funnel-row { display: grid; grid-template-columns: 170px 1fr 46px; align-items: center; gap: 12px; }
        .funnel-label { font-size: 12px; color: rgba(243,234,217,0.65); }
        .funnel-track { height: 26px; background: rgba(243,234,217,0.06); border-radius: 2px; overflow: hidden; }
        .funnel-fill {
          height: 100%; background: linear-gradient(90deg, var(--burgundy), var(--gold-bright));
          display: flex; align-items: center; padding-left: 10px; min-width: 46px;
          transition: width 0.6s var(--ease, ease);
        }
        .funnel-value { font-size: 11px; font-weight: 600; color: var(--walnut-deep); white-space: nowrap; }
        .funnel-pct { font-size: 12px; color: var(--gold-bright); font-family: 'Fraunces', serif; text-align: right; }

        /* ---- donut ---- */
        .donut-wrap { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .donut { width: 130px; height: 130px; transform: rotate(-90deg); flex-shrink: 0; }
        .donut-legend { display: flex; flex-direction: column; gap: 10px; }
        .legend-row { display: flex; align-items: center; gap: 10px; font-size: 13px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
        .dot-gold { background: var(--gold-bright); }
        .dot-turquoise { background: var(--turquoise-bright); }
        .dot-burgundy { background: var(--burgundy-accent); }
        .legend-label { color: var(--ivory); flex: 1; min-width: 90px; }
        .legend-pct { color: rgba(243,234,217,0.5); font-family: 'Fraunces', serif; }

        .trend-icon { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; }

        @media (max-width: 1024px) {
          .middle-row { grid-template-columns: 1fr; }
          .kpi-row { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 620px) {
          .funnel-row { grid-template-columns: 100px 1fr 40px; gap: 8px; }
          .funnel-label { font-size: 11px; }
          .heat-row { overflow-x: auto; padding-bottom: 6px; }
          .heat-cell { min-width: 28px; }
          .donut-wrap { justify-content: center; }
        }

        @media (max-width: 860px) {
          .desktop-only { display: none; }
          .mobile-only { display: flex; }
          .burger-btn { display: flex; }

          .sidebar {
            position: fixed;
            top: 0; left: 0; bottom: 0;
            width: 280px;
            max-width: 82vw;
            z-index: 1001;
            transform: translateX(-100%);
            box-shadow: 8px 0 32px rgba(0,0,0,0.4);
          }
          .sidebar.collapsed { width: 280px; } /* collapse state irrelevant on mobile, drawer always full */
          .sidebar.collapsed .brand-block,
          .sidebar.collapsed .sidebar-footer,
          .sidebar.collapsed .nav-item-label { display: block; }
          .sidebar.collapsed .nav-item { justify-content: flex-start; padding: 12px 16px; }
          .sidebar.mobile-open { transform: translateX(0); }

          .sidebar-scrim {
            display: block;
            position: fixed; inset: 0; background: rgba(0,0,0,0.55);
            z-index: 1000; backdrop-filter: blur(2px);
          }

          .nav-menu { flex-direction: column; overflow-x: visible; }
          .kpi-row { grid-template-columns: 1fr; }
          .topbar, .dashboard-grid { padding-left: 20px; padding-right: 20px; }
          .topbar { padding-top: 24px; }
          .page-title { font-size: 24px; }
        }
      `}</style>

      <div className="admin-grain" />

      {mobileOpen && <div className="sidebar-scrim" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-row">
            <div className="brand-block">
              <div className="brand-logo">ZIYAFAT<span>.</span></div>
              <div className="brand-sub">Admin Portal</div>
            </div>
            <button className="collapse-btn desktop-only" onClick={() => setCollapsed(!collapsed)} title={collapsed ? "Expand" : "Collapse"}>
              {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
            </button>
            <button className="collapse-btn mobile-only" onClick={() => setMobileOpen(false)} title="Close menu">
              <X size={18} />
            </button>
          </div>
        </div>
        <nav className="nav-menu">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-item ${activeTab === key ? "active" : ""}`}
              onClick={() => goTab(key)}
              title={label}
            >
              <Icon size={16} /> <span className="nav-item-label">{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">Ziyafat Restaurant<br />City Mall, Shahr-e-Naw</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="burger-btn mobile-only" onClick={() => setMobileOpen(true)} title="Open menu">
              <MenuIcon size={20} />
            </button>
            <h1 className="page-title">{title} — <em>{emphasis}</em></h1>
          </div>
          <div className="topbar-actions">
            <Bell size={20} color="var(--gold)" style={{ cursor: "pointer" }} />
            <div className="badge-owner">Owner Access</div>
          </div>
        </header>

        {renderTab()}
      </main>
    </div>
  );
}