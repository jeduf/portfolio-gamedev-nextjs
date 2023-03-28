import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  // NOTE: Uncomment the below lines to make the code work
  try {
    console.log(req.body);
    await sendgrid.send({

      to: "kadirtbk@gmail.com", // Your email where you'll receive emails
      from: "kadirtbk@gmail.com", // your website email address here
      subject: `[Portfolio] ${req.body.subject} from ${req.body.fullname}`,
      reply_to: req.body.email,
      html: req.body.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;