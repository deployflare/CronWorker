import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
async function send(env, message, subject) {
  //console.log("Attempting to send email...");
  const msg = createMimeMessage();
  msg.setSender({ name: "Worker", addr: "i@planetrenox.com" });
  msg.setRecipient("planetrenox@protonmail.com");
  msg.setSubject(subject);
  msg.addMessage({
    contentType: 'text/plain',
    data: message
  });
  const email = new EmailMessage(
    "i@planetrenox.com",
    "planetrenox@protonmail.com",
    msg.asRaw()
  );
  try {
    const result = await env.MAILER.send(email);
    //console.log("Email sent successfully:", result);
    return result;
  } catch (err) {
    console.error("Email send error:", err);
    throw new Error(`Failed to send email: ${err.message || err}`);
  }
}
export default send
