import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {      
    const recipient = [{email}];

    try {
       const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification",
       });

       console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Failed to send verification email:", error);
        
        throw new Error("Failed to send verification email: ${error}");
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

try {
    const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        template_uuid:"48c43dff-ea2f-47af-9b69-aca5fb7911e5",
        template_variables: {
          "company_info_name": "Auth Company",
        "name": name,
        },
    });

    console.log("Welcome email sent successfully:", response);
} catch (error) {
    console.error("Failed to send welcome email:", error);
    throw new Error("Failed to send welcome email: ${error}");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Request",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset",
        });

        console.log("Password reset email sent successfully:", response);
    } catch (error) {
        console.error("Failed to send password reset email:", error);
        throw new Error("Failed to send password reset email: ${error}");
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset success",
        });

        console.log("Password reset success email sent successfully:", response);
    } catch (error) {
        console.error("Failed to send password reset success email:", error);
        throw new Error("Failed to send password reset success email: ${error}");
    }
}