export const emailTemplates = {
  OTPTemplate: ({ subject, name, otp }: { subject: string; name: string; otp: string }) => `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${subject}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f7f9;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 30px 40px;
      color: #333333;
    }
    h1 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333333;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      margin: 16px 0;
    }
    .otp-code {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 4px;
      color: #2a9d8f;
      margin: 20px 0;
      text-align: center;
      background-color: #e0f2f1;
      padding: 15px 0;
      border-radius: 6px;
      user-select: all;
    }
    .expiry {
      color: #d00000;
      font-weight: 600;
      font-size: 16px;
      background-color: #ffe6e6;
      padding: 10px 15px;
      border-radius: 5px;
      text-align: center;
      margin-top: 10px;
      display: inline-block;
    }
    .footer {
      margin-top: 40px;
      font-size: 14px;
      color: #777777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container" role="main" aria-label="${subject}">
    <h1>Hello ${name},</h1>
    <p>Your One-Time Password (OTP) code is below:</p>
    <div class="otp-code" aria-label="Your OTP code is ${otp}" tabindex="0">${otp}</div>
    <p class="expiry" aria-live="polite"><strong>Note:</strong> This code will expire in <span>10 minutes</span>.</p>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      &copy; 2025 FinanceFire. All rights reserved.
    </div>
  </div>
</body>
</html>
`
}

