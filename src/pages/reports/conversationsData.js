export const ROWS = [
  { id: 1, convId: 'd7dd4e26-fad2', date: '22/02/2026', time: '21:48', nps: '9', npsClass: 'high', csat: '4.8', amount: '—', detail: {
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/capsules/vertuo', time: '21:47:52' },
      { role: 'bot',  text: "Welcome to Nespresso! I'm your personal coffee assistant. How can I help you today?", time: '21:48:03' },
      { role: 'user', text: "Hi, I'm looking for capsules to make lattes at home", time: '21:48:22' },
      { role: 'bot',  text: 'Happy to help! For great lattes, you need capsules strong enough to hold their own against milk. My top recommendations: Barista Creations Chiaro (Intensity 6) and Barista Creations Scuro (Intensity 8). Both are designed specifically for milk-based drinks.', time: '21:48:45', analyzeVariant: 'faq-answer' },
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/order/capsules…', time: '21:49:05' },
      { role: 'user', text: 'The Chiaro sounds perfect! Any current promotions?', time: '21:49:12' },
      { role: 'bot',  text: 'Barista Creations Chiaro is £4.30 per 10-capsule box. Right now, order 5+ boxes to get 10% off — the discount applies within 24 hours of checkout. Shall I redirect you to our shop?', time: '21:49:31', analyzeVariant: 'hallucination' },
    ]
  }},
  { id: 2, convId: 'a1b3c7d2-e4f8', date: '22/02/2026', time: '21:44', nps: '—', npsClass: 'empty', csat: '—', amount: '—', detail: {
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/machines/vertuo', time: '21:43:55' },
      { role: 'bot',  text: 'Hello! How can I help you?', time: '21:44:10' },
      { role: 'user', text: 'Are my Vertuo capsules compatible with my Original Line machine?', time: '21:44:28' },
      { role: 'bot',  text: 'No, the Vertuo and Original systems are not compatible — they use different brewing technologies. For your Original Line machine, look for capsules labelled with the Original logo. Would you like me to suggest some great Original Line options?', time: '21:44:45', analyzeVariant: 'missing-knowledge' },
    ]
  }},
  { id: 3,  convId: 'b2c4d8e1-f5a9', date: '22/02/2026', time: '21:42', nps: '8',  npsClass: 'high',  csat: '4.2', amount: '40.40' },
  { id: 4,  convId: 'c3d5e9f2-a6b0', date: '22/02/2026', time: '21:38', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 5,  convId: 'd4e6f0a3-b7c1', date: '22/02/2026', time: '21:35', nps: '7',  npsClass: 'mid',   csat: '3.8', amount: '—' },
  { id: 6,  convId: 'e5f7a1b4-c8d2', date: '22/02/2026', time: '21:31', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 7,  convId: 'f6a8b2c5-d9e3', date: '22/02/2026', time: '21:28', nps: '10', npsClass: 'high',  csat: '5.0', amount: '52.00', detail: {
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/capsules/original', time: '21:27:50' },
      { role: 'bot',  text: 'Welcome! How can I help with your Nespresso experience today?', time: '21:28:02' },
      { role: 'user', text: "What's the best high-intensity capsule for a strong espresso?", time: '21:28:18' },
      { role: 'bot',  text: "For a bold, intense espresso I'd recommend Roma — Intensity 8 on the Original Line. It delivers a rich, full-bodied shot with a beautiful crema. Currently £4.30 per 10-capsule box.", time: '21:28:35', analyzeVariant: 'product-answer' },
    ]
  }},
  { id: 8,  convId: 'a7b9c3d6-e0f4', date: '22/02/2026', time: '21:22', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 9,  convId: 'b8c0d4e7-f1a5', date: '22/02/2026', time: '21:18', nps: '5',  npsClass: 'low',   csat: '2.5', amount: '—' },
  { id: 10, convId: 'c9d1e5f8-a2b6', date: '22/02/2026', time: '21:14', nps: '9',  npsClass: 'high',  csat: '4.6', amount: '38.60', detail: {
    messages: [
      { role: 'event', text: 'Visitor loaded a new page', url: 'www.nespresso.com/uk/en/machines/vertuo-next', time: '21:13:48' },
      { role: 'bot',  text: "Hello! I'm here to help with your Nespresso experience.", time: '21:14:05' },
      { role: 'user', text: 'I have a Vertuo Next — which capsules work with it and are best for strong coffee?', time: '21:14:22' },
      { role: 'bot',  text: 'For your Vertuo Next and a strong coffee preference, here are my top picks: Ristretto Decaffeinato (Intensity 10), Roma (Intensity 8), and Volluto (Intensity 4) for a lighter alternative. All are Vertuo-compatible.', time: '21:14:48', analyzeVariant: 'product-reco' },
    ]
  }},
  { id: 11, convId: 'd0e2f6a9-b3c7', date: '22/02/2026', time: '21:09', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 12, convId: 'e1f3a7b0-c4d8', date: '22/02/2026', time: '21:04', nps: '10', npsClass: 'high',  csat: '5.0', amount: '76.00' },
  { id: 13, convId: 'f2a4b8c1-d5e9', date: '22/02/2026', time: '20:58', nps: '8',  npsClass: 'high',  csat: '4.1', amount: '—' },
  { id: 14, convId: 'a3b5c9d2-e6f0', date: '22/02/2026', time: '20:52', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 15, convId: 'b4c6d0e3-f7a1', date: '22/02/2026', time: '20:47', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 16, convId: 'c5d7e1f4-a8b2', date: '22/02/2026', time: '20:43', nps: '6',  npsClass: 'mid',   csat: '3.2', amount: '—' },
  { id: 17, convId: 'd6e8f2a5-b9c3', date: '22/02/2026', time: '20:38', nps: '9',  npsClass: 'high',  csat: '4.7', amount: '28.50' },
  { id: 18, convId: 'e7f9a3b6-c0d4', date: '22/02/2026', time: '20:32', nps: '—',  npsClass: 'empty', csat: '—',   amount: '—' },
  { id: 19, convId: 'f8a0b4c7-d1e5', date: '22/02/2026', time: '20:28', nps: '8',  npsClass: 'high',  csat: '4.3', amount: '45.00' },
  { id: 20, convId: 'a9b1c5d8-e2f6', date: '22/02/2026', time: '20:24', nps: '7',  npsClass: 'mid',   csat: '3.9', amount: '—' },
]
