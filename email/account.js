const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API);


module.exports.sendWelcomeMessage = async (email, username) => {
    const msg = {
        to: email,
        from: 'byronleigh80@gmail.com',
        subject: 'Welcome to Book Collection',
        html: `<h1> Welcome <strong>${username}</strong> to the Book Collection app </h1>
                 <p>Thank you joining us on this journey</p>
               `
    }

    await sgMail.send(msg);
}

module.exports.cancelAccountEmail = async (email, username) => {
    const msg = {
        to: email,
        from: 'byronleigh80@gmail.com',
        subject: 'Sad to see you go!',
        html: ` <p>Good bye ${username} :-(. Please provide feedback regarding your experience.</p>`
    }

    await sgMail.send(msg);
}
