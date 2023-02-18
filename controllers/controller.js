import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const signup = async (req, res, next) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    transporter.sendMail(message).then((info)=>{
        return res.status(200).json({
            message:"email sent successfully.",
            messageId: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch((err)=>{
        return res.status(500).send(err);
    })

    // res.status(200).json({
    //     message: "Signup sucessfully"
    // })
}

export const getBill = (req, res, next) => {

    const {userMail} = req.body;

    let config = {
        service: 'gmail',
        auth:{
            user:process.env.EMAIL,
            pass: process.env.PASS,
        }
    }

    let transporter = nodemailer.createTransport(config);

    let mailgen = new Mailgen ({
        theme:"default",
        product: {
            name:"mailgen",
            link:"https://mailgen.js/"
        }
    })

    let response = {
        body:{
            name:"Sibasish Satapathy",
            intro:"your bill has arrived!",
            table:{
                data:[
                    {
                        item:"nodemailer stack book",
                        description:"A backend application",
                        price: "$10.99",
                    }
                ]
            },

            outro: " looking forward to do more business",
        }
    }

    let mail = mailgen.generate(response);

    let message = {
        from : "sibasishsatpathy2002@gmail.com",
        to: userMail,
        subject: "placed order",
        html:mail,
    }

    transporter.sendMail(message).then(()=>{
        return res.status(200).json({
            msg:"you should receive a mail",
        })
    }).catch((err)=>{
        return res.status(500).send(err);
    })

    // res.status(200).json({
    //     message: "got bill sucessfully."
    // })
}
