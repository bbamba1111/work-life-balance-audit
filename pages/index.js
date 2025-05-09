import nodemailer from "nodemailer";

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "coachbarbara@maketimeformore.com",
    pass: "wbswzqpphjyeppyp"
  }
});

// Audit Questions and Core Life Values
const auditQuestions = [
  { id: 1, value: "Spiritual", question: "In the past 30 days, how connected have you felt to your spiritual life through prayer, meditation, or nature?" },
  { id: 2, value: "Mental", question: "In the past 30 days, how focused and clear have you felt in your thinking?" },
  { id: 3, value: "Physical - Movement", question: "In the past 30 days, how consistently have you engaged in intentional movement or exercise?" },
  { id: 4, value: "Physical - Nourishment", question: "In the past 30 days, how well have you nourished your body with hydration and healthy meals?" },
  { id: 5, value: "Physical - Sleep", question: "In the past 30 days, how often have you experienced 8 hours of restorative sleep?" },
  { id: 6, value: "Emotional", question: "In the past 30 days, how balanced, peaceful, and joyful have you felt emotionally?" },
  { id: 7, value: "Personal", question: "In the past 30 days, how often have you made time for self-care and personal growth?" },
  { id: 8, value: "Intellectual", question: "In the past 30 days, how often have you engaged in learning or skill-building activities?" },
  { id: 9, value: "Professional - Visibility", question: "In the past 30 days, how often have you shared your expertise or expanded your professional visibility?" },
  { id: 10, value: "Financial", question: "In the past 30 days, how intentionally have you focused on income generation and financial planning?" },
  { id: 11, value: "Environmental", question: "In the past 30 days, how much effort have you made to create beauty, balance, or order in your environment?" },
  { id: 12, value: "Relational", question: "In the past 30 days, how attentive and present have you been in your closest relationships?" },
  { id: 13, value: "Social", question: "In the past 30 days, how engaged have you been with supportive, like-minded communities?" },
  { id: 14, value: "Recreational", question: "In the past 30 days, how often have you created space for joy, creativity, or play?" },
  { id: 15, value: "Charitable", question: "In the past 30 days, how often have you contributed to supporting or inspiring others?" }
];

// Feedback Messages
const feedbackMessages = {
  spiritual: "Reconnect with your spiritual side through the GIV•EN™ routine.",
  mental: "Reclaim mental clarity with the 9-to-5 SOP.",
  physicalMovement: "Reset your energy with the 30-Minute Workday Workout.",
  physicalNourishment: "Stay nourished with the Hybrid Lunch Break.",
  physicalSleep: "Prepare for 8 hours of sleep with the Power Down & Unplug Digital Detox.",
  emotional: "The GIV•EN™ routine helps you ground and align emotionally.",
  personal: "Prioritize self-care with the 7-Day Reset.",
  intellectual: "Expand your mind through the 12 Curated Quality of Lifestyle Activities.",
  professionalVisibility: "Increase visibility with the 4-Hour Focused CEO Workday.",
  financial: "Focus on income generation with the 90-Day Business Model.",
  environmental: "Bring balance to your environment through the Quality of Lifestyle Experiences.",
  relational: "Strengthen connections through intentional practices.",
  social: "Engage in the 152 Hours of Weekly Time Freedom to prioritize social connections.",
  recreational: "Create space for joy and play through the 12 Curated Experiences.",
  charitable: "Purpose-driven giving fuels you — track your impact with Cherry Blossom."
};

// Generate Feedback
function generateFeedback(auditData) {
  const scores = Object.entries(auditData).sort((a, b) => a[1] - b[1]);
  const lowestAreas = scores.slice(0, 5);

  return lowestAreas.map(([area]) => {
    const feedback = feedbackMessages[area] || "No feedback available.";
    return `<p><strong>${area.charAt(0).toUpperCase() + area.slice(1)}:</strong> ${feedback}</p>`;
  }).join("");
}

// Apply Now Button Logic
const applyNowButton = `
  <div style="text-align: center; margin-top: 20px;">
    <button onclick="window.location.href='https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header'" 
      style="background-color: #007BFF; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
      Apply Now - Step 2 of 8
    </button>
  </div>
`;

const eightStepProcess = `
  <h2 style="text-align: center; margin-top: 30px;">From Audit to Experience/Installation – 8-Step Process</h2>
  <ol style="text-align: left; margin-left: 20px;">
    <li>✅ Completed: Work-Life Balance Audit</li>
    <li>👉 Next: <a href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header" target="_blank">Complete the Brief Application Form</a></li>
    <li>Choose Your Commitment Level</li>
    <li>Pay Your BETA Experience or Business Model & SOP Installation Fee</li>
    <li>Access Your Make Time For More Success Hub</li>
    <li>Schedule and Complete Onboarding w/ Thought Leader Barbara</li>
    <li>Attend The Sunday Kick-Off Celebration at 1:00 PM ET</li>
    <li>Start Co-Working with Barbara on Monday at 9:00 AM ET</li>
  </ol>
`;

// Send Email Function
async function sendEmail(toEmail) {
  const auditData = {
    spiritual: 2,
    mental: 3,
    physicalMovement: 1,
    physicalNourishment: 2,
    physicalSleep: 1,
    emotional: 3,
    personal: 4,
    intellectual: 2,
    professionalVisibility: 3,
    financial: 5,
    environmental: 2,
    relational: 1,
    social: 4,
    recreational: 2,
    charitable: 1
  };

  const feedbackContent = generateFeedback(auditData);

  const mailOptions = {
    from: "coachbarbara@maketimeformore.com",
    to: toEmail,
    subject: "Your Work-Life Balance Audit Results",
    html: `
      <h1>Your Work-Life Balance Audit Results</h1>
      <p>You’ve taken the first step toward work-life balance. Here’s your custom feedback:</p>
      ${feedbackContent}
      ${eightStepProcess}
      ${applyNowButton}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Test the Email Function
sendEmail("coachbarbara@maketimeformore.com");
