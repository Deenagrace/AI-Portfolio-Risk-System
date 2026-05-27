import { useEffect, useState } from "react"
import axios from "axios"
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis
} from "recharts"

const riskData = [
  { name: "Exposure", risk: 54 },
  { name: "Drift", risk: 9 },
  { name: "Daily Drop", risk: 5 }
]

const portfolioData = [
  { name: "AMGN", value: 53 },
  { name: "DIS", value: 31 },
  { name: "Others", value: 16 }
]

const aiInsight = {
  severity: "HIGH",
  action: "Diversify holdings",
  message: "AI detected high portfolio concentration risk. AMGN and DIS exceed recommended exposure thresholds. Consider redistributing assets to reduce concentration risk."
}

const initialStocks = [
  { symbol: "AMGN", change: -3.2, color: "#ef4444" },
  { symbol: "DIS", change: -1.8, color: "#ef4444" },
  { symbol: "AAPL", change: 1.4, color: "#10b981" },
  { symbol: "TSLA", change: 4.2, color: "#10b981" },
  { symbol: "MSFT", change: 0.9, color: "#10b981" },
  { symbol: "NVDA", change: 5.7, color: "#10b981" },
  { symbol: "GOOGL", change: -0.5, color: "#ef4444" }
]

const logPool = [
  "🟢 Risk engine completed batch validation scan on 100 client records.",
  "⚠ Concentration anomaly detected: Tech allocation drift exceeding 5.2%.",
  "🤖 AWS Lambda triggered bedrock-agent microservice for real-time narrative generation.",
  "📈 Portfolio valuation sync completed across primary database instances.",
  "🔔 Event Bridge emitted high-priority risk state tracking event to SQS queue.",
  "🟢 Safe threshold acknowledged for retail client profile matrix.",
  "⚠ Single stock restriction limit warning generated for symbol: NVDA."
]

const initialRadarRisks = [
  { label: "Exposure Risk", value: 92 },
  { label: "Market Volatility", value: 66 },
  { label: "Allocation Drift", value: 35 },
  { label: "Liquidity Drain", value: 77 }
]

function App() {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState("") 
  const [tickerStocks, setTickerStocks] = useState(initialStocks)
  const [radarRisks, setRadarRisks] = useState(initialRadarRisks)
  const [feedLogs, setFeedLogs] = useState([
    "🟢 Risk engine scanned 100 portfolios",
    "⚠ TSLA exposure exceeded threshold",
    "🤖 AI generated recommendation for client",
    "📈 AMZN updated +3.1%"
  ])

  const [showAssistant, setShowAssistant] = useState(false)
  const [presentationMode, setPresentationMode] = useState(false)
  const [activeMenu, setActiveMenu] = useState("Dashboard")

  // 🤖 SIMULATED AI COPILOT ENGINE STATES
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("Hello! Ask me about system metrics or risk concentrations.")

  const menuItems = [
    "Dashboard",
    "Risk Scan",
    "AI Alerts",
    "Analytics",
    "Settings"
  ]

  // Fetch initial client data and map stable, unique alert timestamps to each entity node
  useEffect(() => {
    axios.get("https://YOUR-RENDER-LINK.onrender.com/clients")
      .then((response) => {
        const clientsWithAlertTimes = response.data.map(client => ({
          ...client,
          lastAlertTime: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        }))
        setClients(clientsWithAlertTimes)
      })
      .catch((error) => console.log(error))
  }, [])

  // 🔄 TIMER 1: Stock ticker variations
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerStocks(prevStocks => 
        prevStocks.map(stock => {
          const shift = (Math.random() * 0.8 - 0.4); 
          const newChange = parseFloat((stock.change + shift).toFixed(1));
          return {
            ...stock,
            change: newChange,
            color: newChange >= 0 ? "#10b981" : "#ef4444"
          }
        })
      )
    }, 4000);
    return () => clearInterval(tickerInterval);
  }, [])

  // 🔄 TIMER 2: Core real-time logs
  useEffect(() => {
    const feedInterval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const structuredLog = `[${timestamp}] ${randomLog}`;
      
      setFeedLogs(prevLogs => [structuredLog, ...prevLogs.slice(0, 4)]);
    }, 5000);
    return () => clearInterval(feedInterval);
  }, [])

  // 🔄 TIMER 3: Radar graph adjustments
  useEffect(() => {
    const radarInterval = setInterval(() => {
      setRadarRisks(prevRisks =>
        prevRisks.map(risk => {
          const delta = Math.floor(Math.random() * 7 - 3); 
          let newValue = risk.value + delta;
          if (newValue > 100) newValue = 100;
          if (newValue < 15) newValue = 15;
          return { ...risk, value: newValue }
        })
      )
    }, 3000);
    return () => clearInterval(radarInterval);
  }, [])

  // 🧠 SIMULATED CO-PILOT HEURISTIC MATRIX
  function askAI() {
    const q = question.toLowerCase().trim()
    
    if (q.includes("risk")) {
      setAnswer("🚨 AI detected moderate concentration risk in client portfolios.")
    } else if (q.includes("portfolio")) {
      setAnswer("💰 Portfolio values remain stable with some exposure alerts.")
    } else if (q.includes("alert")) {
      setAnswer("🔔 26 active alerts detected in monitoring system.")
    } else if (q.includes("health")) {
      setAnswer("🧠 AI Health Score: 87%. Ecosystem stable.")
    } else {
      setAnswer("🤖 NEXUS AI is analyzing your request...")
    }
  }

  const evaluateClientRisk = (client) => {
    if (client.portfolio_value > 700000) {
      return { status: "HIGH RISK", color: "#ef4444", text: "Critically low asset diversification. Concentration limits breached." };
    }
    if (client.portfolio_value > 400000) {
      return { status: "MEDIUM RISK", color: "#f59e0b", text: "Portfolio tracking mild allocation drift. Monitor exposure metrics closely." };
    }
    return { status: "LOW RISK", color: "#10b981", text: "Portfolio positions maintain valid asset allocation thresholds." };
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const highRiskCount = clients.filter(c => c.portfolio_value > 700000).length;
  const mediumRiskCount = clients.filter(c => c.portfolio_value > 400000 && c.portfolio_value <= 700000).length;

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
      color: "white",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      overflowX: "hidden"
    }}>

      {/* --- WORKSPACE ANIMATIONS --- */}
      <style>{`
        .interactive-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .interactive-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(96, 165, 250, 0.2);
          border-color: rgba(96, 165, 250, 0.4) !important;
        }
        
        .ticker-wrap {
          overflow: hidden;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 0;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
        }
        .ticker-content {
          display: flex;
          white-space: nowrap;
          padding-left: 100%;
          animation: scroll 25s linear infinite;
        }
        
        .sidebar-interactive-item {
          color: #94a3b8;
          font-size: 15px;
          font-weight: 500;
        }
        .sidebar-interactive-item:hover {
          background: rgba(255, 255, 255, 0.04) !important;
          color: #ffffff;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 20px #8b5cf6; }
          50% { transform: scale(1.08); box-shadow: 0 0 35px #3b82f6; }
          100% { transform: scale(1); box-shadow: 0 0 20px #8b5cf6; }
        }
      `}</style>

      {/* --- SIDEBAR DECK --- */}
      <div style={{
        width: "230px",
        background: "rgba(15, 23, 42, 0.7)",
        padding: "25px 20px",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 24px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{
          fontSize: "22px",
          fontWeight: "800",
          letterSpacing: "0.5px",
          margin: "0 0 10px 0",
          background: "linear-gradient(90deg,#60a5fa,#a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          🚀 NEXUS AI
        </h2>
        <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
          Secured Node Alpha
        </span>

        <div style={{ marginTop: "30px", flexGrow: 1 }}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveMenu(item)}
              className={activeMenu !== item ? "sidebar-interactive-item" : ""}
              style={{
                padding: "12px 15px",
                marginBottom: "10px",
                borderRadius: "12px",
                cursor: "pointer",
                background: activeMenu === item 
                  ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" 
                  : "transparent",
                color: activeMenu === item ? "#ffffff" : "inherit",
                fontWeight: activeMenu === item ? "600" : "500",
                boxShadow: activeMenu === item ? "0 4px 15px rgba(59, 130, 246, 0.25)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.25s ease"
              }}
            >
              <span style={{ fontSize: "16px" }}>
                {item === "Dashboard" && "🏠"}
                {item === "Risk Scan" && "🛰️"}
                {item === "AI Alerts" && "🤖"}
                {item === "Analytics" && "📊"}
                {item === "Settings" && "⚙️"}
              </span>
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={() => setPresentationMode(!presentationMode)}
          style={{
            background: presentationMode 
              ? "linear-gradient(135deg, #ef4444, #b91c1c)" 
              : "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
            border: "none",
            padding: "12px 15px",
            borderRadius: "12px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            marginBottom: "15px",
            boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "13px",
            transition: "all 0.3s ease"
          }}
        >
          {presentationMode ? "⏹️ Close Blueprint" : "🎬 Presentation Mode"}
        </button>

        <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
          <span style={{ fontSize: "11px", color: "#475569", display: "block" }}>System Core</span>
          <strong style={{ fontSize: "12px", color: "#10b981" }}>🟢 ONLINE</strong>
        </div>
      </div>

      {/* --- DASHBOARD VIEWPORT BLOCK --- */}
      <div style={{
        flex: 1,
        padding: "30px",
        height: "100vh",
        overflowY: "auto"
      }}>

        {/* --- HEADER CONTROL COMPONENT --- */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
        }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", margin: "0px", color: "#fff" }}>
              🤖 {activeMenu}
            </h1>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "3px 0 0 0", opacity: 0.7 }}>
              NEXUS AI Command Center
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", display: "block", textTransform: "uppercase" }}>
                Last Alert Sync
              </span>
              <strong style={{ fontSize: "14px", color: "#a78bfa", fontFamily: "monospace" }}>
                ⏱️ {new Date().toLocaleTimeString()}
              </strong>
            </div>

            <input
              type="text"
              placeholder="🔍 Search client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "12px 20px",
                width: "250px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(15, 23, 42, 0.6)",
                color: "white",
                fontSize: "14px",
                outline: "none",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
              }}
            />
          </div>
        </div>

        {/* --- DYNAMIC REACTIVE SUB-BANNERS --- */}
        {activeMenu === "Risk Scan" && (
          <div style={{
            marginBottom: "20px", padding: "12px 20px", borderRadius: "10px", 
            background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)", 
            color: "#60a5fa", fontWeight: "600", fontSize: "14px"
          }}>
            🛰️ Live Risk Monitoring Activated
          </div>
        )}

        {activeMenu === "AI Alerts" && (
          <div style={{
            marginBottom: "20px", padding: "12px 20px", borderRadius: "10px", 
            background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.2)", 
            color: "#a78bfa", fontWeight: "600", fontSize: "14px"
          }}>
            🤖 AI generated 26 alerts today
          </div>
        )}

        {activeMenu === "Analytics" && (
          <div style={{
            marginBottom: "20px", padding: "12px 20px", borderRadius: "10px", 
            background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", 
            color: "#10b981", fontWeight: "600", fontSize: "14px"
          }}>
            📊 Viewing analytics dashboard
          </div>
        )}

        {activeMenu === "Settings" && (
          <div style={{
            marginBottom: "20px", padding: "12px 20px", borderRadius: "10px", 
            background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)", 
            color: "#f59e0b", fontWeight: "600", fontSize: "14px"
          }}>
            ⚙ System configuration center
          </div>
        )}

        {/* --- BLUEPRINT PRESENTATION COMPONENT --- */}
        {presentationMode && (
          <div style={{
            background: "rgba(15, 23, 42, 0.85)",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "30px",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 10px 40px rgba(139, 92, 246, 0.15)",
            animation: "fadeIn 0.4s ease"
          }}>
            <h2 style={{ fontSize: "20px", margin: "0 0 15px 0", color: "#60a5fa", display: "flex", alignItems: "center", gap: "8px" }}>
              ⚡ System Architecture Workflow
            </h2>
            <div style={{ 
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px", 
              fontWeight: "600", 
              color: "#e2e8f0", 
              background: "rgba(255, 255, 255, 0.02)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(59, 130, 246, 0.3)" }}>📈 Market Data Feed (5-10s Mock Streaming)</div>
              <span style={{ color: "#a78bfa", fontSize: "18px", margin: "0" }}>⬇</span>
              <div style={{ background: "rgba(239, 68, 68, 0.1)", padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.3)" }}>🚨 Risk Detection Engine (Drift, Concentration, Volatility Checks)</div>
              <span style={{ color: "#a78bfa", fontSize: "18px", margin: "0" }}>⬇</span>
              <div style={{ background: "rgba(139, 92, 246, 0.1)", padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(139, 92, 246, 0.3)" }}>🤖 AI Insight Generator (Amazon Bedrock Microservice Narratives)</div>
              <span style={{ color: "#a78bfa", fontSize: "18px", margin: "0" }}>⬇</span>
              <div style={{ background: "rgba(245, 158, 11, 0.1)", padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.3)" }}>🔔 Alert Payload Notification Broker (EventBridge Broadcast)</div>
              <span style={{ color: "#a78bfa", fontSize: "18px", margin: "0" }}>⬇</span>
              <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "8px 20px", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.3)" }}>📊 Reactive Control Dashboard Viewport</div>
            </div>
          </div>
        )}

        {/* --- STOCK TICKER --- */}
        <div className="ticker-wrap">
          <div className="ticker-content">
            {tickerStocks.map((stock, idx) => (
              <span key={idx} style={{ padding: "0 30px", fontSize: "14px", fontWeight: "600", display: "inline-block" }}>
                ⚡ {stock.symbol} <span style={{ color: stock.color, marginLeft: "5px" }}>{stock.change >= 0 ? `+${stock.change}` : stock.change}%</span>
              </span>
            ))}
            {tickerStocks.map((stock, idx) => (
              <span key={`dup-${idx}`} style={{ padding: "0 30px", fontSize: "14px", fontWeight: "600", display: "inline-block" }}>
                ⚡ {stock.symbol} <span style={{ color: stock.color, marginLeft: "5px" }}>{stock.change >= 0 ? `+${stock.change}` : stock.change}%</span>
              </span>
            ))}
          </div>
        </div>

        {/* --- METRICS ROW --- */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
          <div className="interactive-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,.05)", padding: "20px", borderRadius: "20px", width: "170px", boxShadow: "0 8px 32px rgba(0,0,0,.2)" }}>
            <h3 style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 10px 0" }}>👥 Total Clients</h3>
            <h2 style={{ fontSize: "32px", margin: 0, color: "#60a5fa" }}>{clients.length}</h2>
          </div>

          <div className="interactive-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,.05)", padding: "20px", borderRadius: "20px", width: "170px", boxShadow: "0 8px 32px rgba(0,0,0,.2)" }}>
            <h3 style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 10px 0" }}>🚨 High Risk Cases</h3>
            <h2 style={{ fontSize: "32px", margin: 0, color: "#ef4444" }}>{highRiskCount}</h2>
          </div>

          <div className="interactive-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,.05)", padding: "20px", borderRadius: "20px", width: "170px", boxShadow: "0 8px 32px rgba(0,0,0,.2)" }}>
            <h3 style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 10px 0" }}>⚠ Active Alerts</h3>
            <h2 style={{ fontSize: "32px", margin: 0, color: "#f59e0b" }}>{highRiskCount + mediumRiskCount}</h2>
          </div>

          <div className="interactive-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,.05)", padding: "20px", borderRadius: "20px", width: "170px", boxShadow: "0 8px 32px rgba(0,0,0,.2)" }}>
            <h3 style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 10px 0" }}>💰 Avg Portfolio</h3>
            <h2 style={{ fontSize: "32px", margin: 0, color: "#10b981" }}>$420K</h2>
          </div>
        </div>

        {/* --- SYSTEM SCORE --- */}
        <div style={{
          background: "linear-gradient(135deg,#2563eb,#7c3aed)",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "35px",
          boxShadow: "0 8px 30px rgba(37, 99, 235, 0.2)"
        }}>
          <h2 style={{ fontSize: "20px", margin: "0", fontWeight: "600" }}>🧠 System AI Health Score</h2>
          <h1 style={{ fontSize: "52px", margin: "5px 0", fontWeight: "800" }}>87%</h1>
          <p style={{ fontSize: "14px", opacity: .85, margin: "0" }}>
            Active client assets are structurally healthy. System-wide monitoring detected localized allocation variances.
          </p>
        </div>

        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600" }}>
          👤 Client Profiles & Compliance Trackers
        </h2>
        
        {/* --- PROFILE CARDS --- */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
          marginBottom: "45px"
        }}>
          {
            filteredClients.slice(0, 6).map((client, index) => {
              const metrics = evaluateClientRisk(client);

              return (
                <div
                  key={index}
                  className="interactive-card"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "22px",
                    borderRadius: "20px",
                    backdropFilter: "blur(15px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                      <h3 style={{ color: "#fff", fontSize: "17px", margin: "0" }}>
                        {client.name}
                      </h3>
                      <span style={{ 
                        background: metrics.color, 
                        padding: "5px 12px", 
                        borderRadius: "20px", 
                        fontWeight: "bold", 
                        fontSize: "11px",
                        color: "white" 
                      }}>
                        {metrics.status}
                      </span>
                    </div>

                    <p style={{ margin: "6px 0", fontSize: "13px", color: "#94a3b8" }}>
                      🆔 Account: <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>{client.client_id}</span>
                    </p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}>
                      💰 Value: <strong style={{ color: "#60a5fa" }}>${client.portfolio_value.toLocaleString()}</strong>
                    </p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}>
                      📈 Positions: <strong style={{ color: "#a78bfa" }}>{client.positions.length} Assets</strong>
                    </p>
                    
                    {/* CLIENT ALERTS TIMESTAMPS SECTION */}
                    <p style={{ margin: "6px 0", fontSize: "13px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
                      🕒 Last Client Alert: <span style={{ color: "#cbd5e1", fontWeight: "600", fontFamily: "monospace" }}>{client.lastAlertTime || "11:14:02 AM"}</span>
                    </p>

                    <div style={{
                      marginTop: "15px",
                      background: "rgba(15, 23, 42, 0.4)",
                      padding: "14px",
                      borderRadius: "12px",
                      borderLeft: `4px solid ${metrics.color}`
                    }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", display: "block", color: "#a78bfa", marginBottom: "3px" }}>
                        🧠 AI COMMENTARY
                      </span>
                      <p style={{ margin: "0", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.4" }}>
                        {metrics.text}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        {/* --- GRAPHICS METRICS LAYOUT --- */}
        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600" }}>📊 Asset Distribution Overviews</h2>
        <div style={{ display: "flex", gap: "40px", marginTop: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          <div className="interactive-card" style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.04)" }}>
            <h3 style={{ fontSize: "15px", color: "#94a3b8", margin: "0 0 15px 0" }}>Portfolio Exposure Matrix</h3>
            <PieChart width={330} height={250}>
              <Pie data={portfolioData} dataKey="value" outerRadius={85} label>
                {portfolioData.map((entry, index) => <Cell key={index} fill={index === 0 ? "#60a5fa" : index === 1 ? "#a78bfa" : "#475569"} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="interactive-card" style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.04)" }}>
            <h3 style={{ fontSize: "15px", color: "#94a3b8", margin: "0 0 15px 0" }}>Global Risk Counts</h3>
            <BarChart width={380} height={250} data={riskData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Bar dataKey="risk" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </div>
        </div>

        {/* --- GLOBAL STRATEGY SUGGESTIONS --- */}
        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600" }}>🤖 Global Platform Recommendations</h2>
        <div style={{
          background: "linear-gradient(135deg,#7c3aed,#2563eb)",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 8px 40px rgba(0,0,0,.4)",
          maxWidth: "850px",
          marginBottom: "40px"
        }}>
          <div style={{ marginBottom: "15px" }}>
            <span style={{ background: "#ef4444", padding: "5px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "12px" }}>
              🚨 CORE CONCENTRATION ALERT
            </span>
          </div>
          <h3 style={{ marginTop: "10px", fontSize: "18px" }}>💡 Suggested Mitigation Strategy: {aiInsight.action}</h3>
          <p style={{ lineHeight: "1.7", opacity: 0.95, fontSize: "15px" }}>{aiInsight.message}</p>
        </div>

        {/* --- LIVE SYSTEM ACTIVITY FEED --- */}
        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600", marginTop: "40px" }}>
          📡 Live System Activity Feed
        </h2>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          padding: "20px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          maxWidth: "700px",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          marginBottom: "40px"
        }}>
          {feedLogs.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "14px 10px",
                fontSize: "14px",
                color: index === 0 ? "#60a5fa" : "#e2e8f0", 
                fontWeight: index === 0 ? "600" : "normal",
                borderBottom: index !== feedLogs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.5s ease"
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* --- AI THREAT RADAR --- */}
        <h2 style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "600", marginTop: "40px" }}>
          🛰️ AI Threat Radar
        </h2>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          padding: "25px",
          borderRadius: "20px",
          width: "480px",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.05)",
          marginBottom: "60px"
        }}>
          {radarRisks.map((risk, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600", color: "#cbd5e1" }}>
                <span>{risk.label}</span>
                <span style={{ color: risk.value > 80 ? "#ef4444" : risk.value > 50 ? "#f59e0b" : "#10b981", marginLeft: "auto" }}>
                  {risk.value}%
                </span>
              </div>
              
              <div style={{
                height: "12px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                marginTop: "8px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${risk.value}%`,
                  height: "100%",
                  borderRadius: "10px",
                  background: "linear-gradient(90deg, #ef4444, #f59e0b)",
                  transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            </div>
          ))}
          
          <p style={{ margin: "15px 0 0 0", fontSize: "13px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ animation: "pulse 1.5s infinite", display: "inline-block" }}>🤖</span> 
            AI scanning total systemic portfolio ecosystem...
          </p>
        </div>

      </div>

      {/* --- INTEGRATED SIMULATED COPILOT PANEL --- */}
      {showAssistant && (
        <div style={{
          position: "fixed",
          right: "30px",
          bottom: "120px",
          width: "320px",
          background: "rgba(15, 23, 42, 0.95)",
          padding: "20px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 12px 40px rgba(139,92,246,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 999,
          fontFamily: "inherit"
        }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#60a5fa", display: "flex", alignItems: "center", gap: "8px" }}>
            🤖 NEXUS Copilot
          </h3>

          {/* DYNAMIC ANSWER PORT */}
          <div style={{
            marginTop: "10px",
            background: "rgba(255, 255, 255, 0.03)",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            minHeight: "45px"
          }}>
            <p style={{ margin: "0", fontSize: "14px", color: "#cbd5e1", lineHeight: "1.5" }}>
              {answer}
            </p>
          </div>
          
          {/* USER INTERACTION FIELD */}
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askAI()}
            placeholder="Ask AI..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(15, 23, 42, 0.6)",
              color: "white",
              fontSize: "13px",
              outline: "none",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
              boxSizing: "border-box"
            }}
          />
          
          {/* ACTION SUBMIT BUTTON */}
          <button
            onClick={askAI}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)"
            }}
          >
            Ask Engine
          </button>
        </div>
      )}

      {/* --- FLOATING CO-PILOT TRIGGER ORB --- */}
      <div
        onClick={() => setShowAssistant(!showAssistant)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          cursor: "pointer",
          boxShadow: "0 0 30px #8b5cf6",
          animation: "pulse 2s infinite",
          zIndex: 999
        }}
        title="NEXUS AI Assistant"
      >
        🤖
      </div>

    </div>
  )
}


export default App