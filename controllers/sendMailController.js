const nodemailer = require("nodemailer");

const sendMailController = async (req, res) => {
  try {
    const payload = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ACCOUNT, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    const mailOption = {
      from: `BCH Đoàn Khoa CNTT <dangkytruccodo@gmail.com>`, // sender address
      to: `${payload.email}`, // list of receivers
      subject: "Thông báo về việc đăng ký trực cờ đỏ Trường CNTT-TT ✔", // Subject line
      text: `Xin chào ${payload.name},`, // plain text body
      html: `
            <b>Xin chào ${payload.name},</b>
            <p>Chúc mừng bạn đã đăng ký trực cờ đỏ thành công!</p>
            <p>Ngày trực: ${payload.register_date}. Ca trực: ${payload.shift}</p>
            <p>Kiểm tra xem thông tin của mình đã đúng chưa nhé!</p>
            <p>Nếu có thắc mắc vui lòng phản hồi lại email này.</p>
            <b>Xin cảm ơn,</b>
            `, // html body
    };
    transporter.sendMail(mailOption, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(500).json({ message: "ban da gui mail thanh cong" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMailController;
