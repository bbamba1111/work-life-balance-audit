import nodemailer from "nodemailer";

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "coachbarbara@maketimeformore.com",
    pass: "wbswzqpphjyeppyp"
  }
});

// 8-Step Process – To Be Included in Email and Application Form
const eightStepProcess = `
  <h2>Apply Now to Work with Thought Leader Barbara – From Audit to Experience/Installation</h2>
  <ol>
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

// Feedback Messages for Initial Feedback
const feedbackMessages = {
  spiritual: {
    message: "Feeling spiritually disconnected? Start with a 5-minute grounding practice like deep breathing or gratitude journaling to reconnect.",
    link: "https://www.maketimeformore.com/products/apply#5-steps"
  },
  mental: {
    message: "Overwhelmed mentally? Take 10 minutes for a brain dump to clear mental fog.",
    link: "https://www.maketimeformore.com/products/apply#sop-installation"
  },
  physicalMovement: {
    message: "Low on movement? A quick 5-minute stretch can reset your focus and energy.",
    link: "https://www.maketimeformore.com/products/apply#heres-what-well-do"
  },
  physicalSleep: {
    message: "Struggling with sleep? Power down 30 minutes before bed to reset.",
    link: "https://www.maketimeformore.com/products/apply#heres-what-well-do"
  },
  physicalNourishment: {
    message: "Feeling sluggish? Hydrate and add a nutrient-dense snack to boost energy.",
    link: "https://www.maketimeformore.com/products/apply#heres-what-well-do"
  },
  emotional: {
    message: "Emotionally off-balance? Take 5 minutes to breathe deeply and recenter.",
    link: "https://www.maketimeformore.com/products/apply#5-steps"
  }
};

// Generate Feedback
const generateFeedback = (auditData) => {
  const scores = Object.entries(auditData).sort((a, b) => a[1] - b[1]);
  const lowestAreas = scores.slice(0, 5);

  return lowestAreas.map(([area]) => {
    const { message, link } = feedbackMessages[area] || { message: "No feedback available.", link: "#" };
    return `<p><strong>${area.charAt(0).toUpperCase() + area.slice(1)}:</strong> ${message} <a href="${link}" target="_blank">Learn More</a></p>`;
  }).join("");
};

// Send Email Function
const sendEmail = async (toEmail, auditData) => {
  const feedbackContent = generateFeedback(auditData);

  const emailContent = `
    <h1>Your Work-Life Balance Audit Results</h1>
    <p>You’ve completed Step 1 in the process. Here’s your custom feedback based on your responses:</p>
    ${feedbackContent}
    <hr />
    ${eightStepProcess}
    <p>Ready to move forward? <a href="https://docs.google.com/forms/d/e/1FAIpQLSeYa2yNmiIOXykp3Kd5Xts0jDPe96NJ4adWhFYEwi5GXZ3Ilw/viewform?usp=header" target="_blank">Apply Now</a></p>
  `;

  const mailOptions = {
    from: "coachbarbara@maketimeformore.com",
    to: toEmail,
    subject: "Your Work-Life Balance Audit Results – Next Step: Apply Now",
    html: emailContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${toEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Example Data for Testing
const exampleData = {
  spiritual: 2,
  mental: 1,
  physicalMovement: 1,
  physicalSleep: 3,
  physicalNourishment: 2,
  emotional: 2
};

// Test Email
sendEmail("coachbarbara@maketimeformore.com", exampleData);
