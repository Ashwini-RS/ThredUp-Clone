const PDFDocument = require('pdfkit');

// function gstInvoicePdf() {

const GSTpdf = (orders, user) => {
    return new Promise((resolve) => {
        const doc = new PDFDocument()
        const buffers = []
        doc.on('data', buffers.push.bind(buffers))
        doc.on('end', () => {
            resolve(Buffer.concat(buffers))
        })

        const date = new Date(orders.orderDate)
        const formattedOrderDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`

        doc.image('./image/purpllelogo.jpg', 50, 45, { width: 100 })
            .fontSize(10)
            .text('101-B, 1st Floor, Raheja Plaza -I, LBS Marg', 200, 50, { align: 'right' })
            .text('Mumbai, Maharashtra, India, 400086', 200, 65, { align: 'right' })
            .text('Support: purplle@supportcare.com', 200, 80, { align: 'right' })
            .moveDown();

        doc.moveTo(50, 105)
            .lineTo(550, 105)
            .lineWidth(1)
            .strokeColor('#9d9696')
            .stroke();

        doc.font('Helvetica-Bold')
            .fontSize(14)
            .text('GST INVOICE RECEIPT', 50, 120, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Invoice No.: ', 50, 150, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text(`INV${Math.floor(Math.random() * (1000000 - 100000)) + 100000}`, 120, 150, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Order ID: ', 50, 170, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text( `ORD${orders._id.toString().slice(-6)}`, 120, 170, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Order Date: ', 50, 190, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text(formattedOrderDate, 120, 190, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('GSTIN.: ', 320, 150, { align: 'right', width: 100 })

        doc.font('Helvetica')
            .fontSize(10)
            .text('2ACC4455KL57231', 430, 150, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Payment: ', 330, 170, { align: 'right', width: 100 })

        doc.font('Helvetica')
            .fontSize(10)
            .text(orders.paymentMode, 430, 170, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Status: ', 320, 190, { align: 'right', width: 100 })

        doc.font('Helvetica')
            .fontSize(10)
            .text(orders.paymentStatus, 430, 190, { align: 'left' })

        doc.moveTo(50, 210)
            .lineTo(550, 210)
            .lineWidth(1)
            .strokeColor('#9d9696')
            .stroke();

        doc.font('Helvetica-Bold')
            .fontSize(14)
            .text('Billing Address: ', 50, 220, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text(user.username, 50, 240, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text(`${user.address[0].location},${user.address[0].city}, ${user.address[0].state} - ${user.address[0].pincode}`, 50, 260, { align: 'left' })

        doc.moveTo(50, 280)
            .lineTo(550, 280)
            .lineWidth(1)
            .strokeColor('#9d9696')
            .stroke();

        doc.font('Helvetica-Bold')
            .fontSize(12)
            .text('Product Details (GST Inclusive Taxes)', 50, 300);

        //Products items

        doc.font('Helvetica-Bold')
            .fontSize(10);

        doc.text('Product', 50, 325);
        doc.text('Qty', 180, 325);
        doc.text('Base Price', 240, 325);
        doc.text('CGST (9%)', 340, 325);
        doc.text('SGST (9%)', 420, 325);
        doc.text('Total', 500, 325);

        doc.moveTo(50, 340)
            .lineTo(550, 340)
            .stroke();

        doc.font('Helvetica');

        const gst = 18
        let y = 350

        const products = orders.products

        products.forEach((product) => {

            const totalPrice = Number(product.newPrice)
            const productQuantity = Number(product.quantity)

            const totalProductPrice = totalPrice * productQuantity
            const gstAmount = (totalProductPrice * gst) / (100 + gst)
            const basePrice = totalProductPrice - gstAmount

            const cgst = gstAmount / 2
            const sgst = gstAmount / 2

            doc.text(product.productName, 50, y);
            doc.text(productQuantity, 180, y);
            doc.text(`Rs.${basePrice.toFixed(2)}`, 240, y);
            doc.text(`Rs.${cgst.toFixed(2)}`, 340, y);
            doc.text(`Rs.${sgst.toFixed(2)}`, 420, y);
            doc.text(`Rs.${totalProductPrice}`, 500, y);

            y += 25
        })

        y += 10;

        doc.moveTo(50, y)
            .lineTo(550, y)
            .stroke();

        doc.font('Helvetica')
            .fontSize(10);

        doc.font('Helvetica')
            .fontSize(10);

        const subTotal = products.reduce((total, item) => {
            return total + Number(item.newPrice) * Number(item.quantity)
        }, 0)

        const platformFee = 5
        const shipping = 25
        const grandTotal = subTotal + platformFee + shipping

        y += 10;

        doc.text('Subtotal', 380, y);
        doc.text(`Rs.${subTotal}`, 500, y);

        y += 15;

        doc.text('Platform Fee', 380, y);
        doc.text(`Rs.${platformFee}`, 500, y);

        y += 15;

        doc.text('Shipping & Other Charges', 380, y);
        doc.text(`Rs.${shipping}`, 500, y);

        y += 15;
        doc.moveTo(50, y) 
            .lineTo(550, y) 
            .stroke();

        doc.font('Helvetica-Bold');

        y += 15

        doc.text('Grand Total', 380, y);
        doc.text(`Rs.${grandTotal}`, 500, y);

        doc.end()
    })
}

module.exports = { GSTpdf }