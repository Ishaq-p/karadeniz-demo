"use client";

import React from "react";
import {
  LayoutDashboard, ShoppingBag, CalendarDays, BookOpen,
  Briefcase, Star, Users, BarChart3, Bell, ArrowUpRight, ArrowDownRight, MoreHorizontal
} from "lucide-react";

export default function ZiyafatAdmin() {
  return (
    <div className="admin-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Jost:wght@300;400;500;600&display=swap');

        .admin-root {
          --burgundy: #6e1a1f; --burgundy-deep: #4a1014;
          --walnut: #241209; --walnut-deep: #170a04;
          --navy: #1c2438; --ivory: #f3ead9; --ivory-deep: #e8dcc2;
          --turquoise: #2c8c86; --turquoise-bright: #3fb0a8;
          --gold: #c9973f; --gold-bright: #e3b158;
          
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

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: var(--walnut);
          border-right: 1px solid rgba(201,151,63,0.2);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
        .sidebar-header {
          padding: 32px 24px;
          border-bottom: 1px solid rgba(201,151,63,0.15);
        }
        .brand-logo {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--ivory);
          line-height: 1.2;
        }
        .brand-logo span { color: var(--gold-bright); }
        .brand-sub {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--gold);
          margin-top: 4px;
        }

        .nav-menu {
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: rgba(243,234,217,0.6);
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .nav-item:hover {
          color: var(--ivory);
          background: rgba(255,255,255,0.02);
        }
        .nav-item.active {
          background: var(--gold-bright);
          color: var(--walnut-deep);
          font-weight: 600;
          clip-path: polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .topbar {
          padding: 32px 48px 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .page-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 400;
          color: var(--ivory);
        }
        .page-title em {
          font-style: italic;
          color: var(--gold-bright);
        }
        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .badge-owner {
          background: rgba(201,151,63,0.15);
          color: var(--gold-bright);
          border: 1px solid var(--gold);
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
        }

        .dashboard-grid {
          padding: 0 48px 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* KPI Row */
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .panel {
          background: var(--walnut);
          border: 1px solid rgba(201,151,63,0.25);
          padding: 24px;
          position: relative;
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
        }
        .panel::before {
          content: '';
          position: absolute;
          top: 0; left: 16px; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--turquoise-bright), var(--gold));
        }
        
        .kpi-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(243,234,217,0.6);
          margin-bottom: 8px;
        }
        .kpi-value {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 500;
          color: var(--ivory);
          margin-bottom: 12px;
        }
        .kpi-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .trend-up { color: var(--turquoise-bright); }
        .trend-down { color: #e96d71; }
        .trend-neutral { color: var(--gold-bright); }

        /* Middle Row: Chart & Live Orders */
        .middle-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        .panel-title {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 500;
          color: var(--ivory);
          margin-bottom: 24px;
        }

        /* Pseudo-chart */
        .chart-container {
          height: 200px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding-top: 20px;
          border-bottom: 1px solid rgba(243,234,217,0.1);
        }
        .chart-col {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        }
        .chart-bar {
          width: 100%;
          background: linear-gradient(180deg, var(--gold) 0%, rgba(201,151,63,0.1) 100%);
          border-top: 2px solid var(--gold-bright);
          transition: height 0.3s;
        }
        .chart-label {
          font-size: 11px;
          color: rgba(243,234,217,0.5);
          text-transform: uppercase;
        }

        /* Live Orders List */
        .order-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .order-item {
          display: flex;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(243,234,217,0.08);
        }
        .order-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .o-main { font-weight: 600; font-size: 14px; color: var(--ivory); margin-bottom: 4px; }
        .o-sub { font-size: 12px; color: rgba(243,234,217,0.5); }
        .o-right { text-align: right; }
        .o-price { font-family: 'Fraunces', serif; font-size: 15px; color: var(--gold-bright); font-weight: 500; margin-bottom: 6px; }
        .o-status {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 8px;
          border: 1px solid;
        }
        .status-new { color: var(--gold-bright); border-color: rgba(227,177,88,0.3); background: rgba(227,177,88,0.1); }
        .status-served { color: var(--turquoise-bright); border-color: rgba(63,176,168,0.3); background: rgba(63,176,168,0.1); }
        .status-complete { color: rgba(243,234,217,0.6); border-color: rgba(243,234,217,0.2); }

        /* Data Table */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th {
          text-align: left;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(243,234,217,0.5);
          padding: 0 16px 16px;
          border-bottom: 1px solid rgba(201,151,63,0.3);
        }
        .data-table td {
          padding: 16px;
          font-size: 14px;
          border-bottom: 1px solid rgba(243,234,217,0.06);
        }
        .data-table tr:last-child td { border-bottom: none; }
        .td-name { font-weight: 500; color: var(--ivory); }
        .td-cat { color: rgba(243,234,217,0.6); }
        .td-orders { color: var(--ivory); }
        .td-rev { font-family: 'Fraunces', serif; font-weight: 600; color: var(--gold-bright); text-align: right; }
        .th-rev { text-align: right !important; }
      `}</style>

      <div className="admin-grain" />

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">ZIYAFAT<span>.</span></div>
          <div className="brand-sub">Admin Portal</div>
        </div>
        <nav className="nav-menu">
          <div className="nav-item active"><LayoutDashboard size={16} /> Dashboard</div>
          <div className="nav-item"><ShoppingBag size={16} /> Orders</div>
          <div className="nav-item"><CalendarDays size={16} /> Reservations</div>
          <div className="nav-item"><BookOpen size={16} /> Menu Manager</div>
          <div className="nav-item"><Briefcase size={16} /> B2B Accounts</div>
          <div className="nav-item"><Star size={16} /> Reviews</div>
          <div className="nav-item"><Users size={16} /> Staff & Roles</div>
          <div className="nav-item"><BarChart3 size={16} /> Analytics</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h1 className="page-title">Overview — <em>Today</em></h1>
          <div className="topbar-actions">
            <Bell size={20} color="var(--gold)" style={{ cursor: "pointer" }} />
            <div className="badge-owner">Owner Access</div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* KPIs */}
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

          {/* Middle Row */}
          <div className="middle-row">
            <div className="panel">
              <div className="panel-title">Revenue by Day — <em>This Week</em></div>
              <div className="chart-container">
                {/* Simulated Chart Bars */}
                {[
                  { day: 'Mon', h: '40%' }, { day: 'Tue', h: '55%' }, { day: 'Wed', h: '45%' },
                  { day: 'Thu', h: '70%' }, { day: 'Fri', h: '85%' }, { day: 'Sat', h: '95%' },
                  { day: 'Sun', h: '60%' }
                ].map((d) => (
                  <div className="chart-col" key={d.day}>
                    <div className="chart-bar" style={{ height: d.h }}></div>
                    <div className="chart-label">{d.day}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-title">Live Orders</div>
              <div className="order-list">
                <div className="order-item">
                  <div>
                    <div className="o-main">Table 12 — Dine-in</div>
                    <div className="o-sub">2× Kabuli Palaw, 1× Mantu</div>
                  </div>
                  <div className="o-right">
                    <div className="o-price">$64</div>
                    <div className="o-status status-new">NEW</div>
                  </div>
                </div>
                <div className="order-item">
                  <div>
                    <div className="o-main">Corporate — Embassy of X</div>
                    <div className="o-sub">B2B catering, 40 guests</div>
                  </div>
                  <div className="o-right">
                    <div className="o-price">$1,220</div>
                    <div className="o-status status-new">NEW</div>
                  </div>
                </div>
                <div className="order-item">
                  <div>
                    <div className="o-main">Table 4 — Dine-in</div>
                    <div className="o-sub">Chapli Kebab, 2× drinks</div>
                  </div>
                  <div className="o-right">
                    <div className="o-price">$38</div>
                    <div className="o-status status-served">SERVED</div>
                  </div>
                </div>
                <div className="order-item">
                  <div>
                    <div className="o-main">Online — Delivery</div>
                    <div className="o-sub">Ashak Platter, family size</div>
                  </div>
                  <div className="o-right">
                    <div className="o-price">$52</div>
                    <div className="o-status status-complete">COMPLETE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Table */}
          <div className="panel">
            <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Top Performing Dishes — <em>Last 30 Days</em></span>
              <MoreHorizontal size={20} color="rgba(243,234,217,0.5)" style={{ cursor: "pointer" }} />
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Category</th>
                  <th>Orders</th>
                  <th className="th-rev">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-name">Kabuli Palaw</td>
                  <td className="td-cat">Signature</td>
                  <td className="td-orders">412</td>
                  <td className="td-rev">$9,888</td>
                </tr>
                <tr>
                  <td className="td-name">Chapli Kebab</td>
                  <td className="td-cat">Grill</td>
                  <td className="td-orders">356</td>
                  <td className="td-rev">$7,476</td>
                </tr>
                <tr>
                  <td className="td-name">Mantu & Ashak Platter</td>
                  <td className="td-cat">For the Table</td>
                  <td className="td-orders">298</td>
                  <td className="td-rev">$5,364</td>
                </tr>
                <tr>
                  <td className="td-name">Lamb Karahi</td>
                  <td className="td-cat">Signature</td>
                  <td className="td-orders">241</td>
                  <td className="td-rev">$6,025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}