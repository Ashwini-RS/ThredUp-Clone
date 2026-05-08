const PDFDocument = require('pdfkit');

// function gstInvoicePdf() {

const GSTpdf = (orders, user) => {

    return new Promise((resolve) => {

        const doc = new PDFDocument({
            margin: 40,
            size: 'A4'
        })

        const buffers = []

        doc.on('data', buffers.push.bind(buffers))

        doc.on('end', () => {
            resolve(Buffer.concat(buffers))
        })

        const date = new Date(orders.orderDate)

        const formattedDate =
            `${String(date.getDate()).padStart(2, '0')}-` +
            `${String(date.getMonth() + 1).padStart(2, '0')}-` +
            `${date.getFullYear()}`

        doc.font('Helvetica-Bold')
            .fontSize(18)
            .text('Tax Invoice', 40, 35)

        doc.font('Helvetica')
            .fontSize(10)

        doc.text(
            `Order Id: ORD${orders._id.toString().slice(-6)}`,
            40,
            70
        )

        doc.text(
            `Order Date: ${formattedDate}`,
            40,
            85
        )

        doc.text(
            `Invoice No: INV${Math.floor(Math.random() * 1000000)}`,
            330,
            70
        )

        doc.text(
            `Invoice Date: ${formattedDate}`,
            330,
            85
        )

        doc.text(
            'GSTIN: 29ABCDE1234F1Z5',
            330,
            100
        )

        doc.text(
            'PAN: ABCDE1234F',
            330,
            115
        )

        doc.moveTo(40, 145)
            .lineTo(555, 145)
            .stroke()

        doc.font('Helvetica-Bold')
            .fontSize(11)
            .text('Sold By', 40, 160)

        doc.font('Helvetica')
            .fontSize(10)

        doc.text('ThreadUp Fashion Pvt Ltd,', 40, 180)

        doc.text('101-B, Raheja Plaza,', 40, 195)

        doc.text('LBS Marg, Mumbai - 400086', 40, 210)

        doc.text('GST: 29ABCDE1234F1Z5', 40, 225)

        doc.font('Helvetica-Bold')
            .fontSize(11)
            .text('Billing Address', 320, 160)

        doc.font('Helvetica')
            .fontSize(10)

        doc.text(user.username, 320, 180)

        doc.text(user.address[0].location, 320, 195)

        doc.text(user.address[0].city, 320, 210)

        doc.text(
            `${user.address[0].state} - ${user.address[0].pincode}`,
            320,
            225
        )


        doc.font('Helvetica-Bold')
            .fontSize(11)
            .text('Shipping Address', 320, 255)

        doc.font('Helvetica')
            .fontSize(10)

        doc.text(user.username, 320, 275)

        doc.text(user.address[0].location, 320, 290)

        doc.text(user.address[0].city, 320, 305)

        doc.text(
            `${user.address[0].state} - ${user.address[0].pincode}`,
            320,
            320
        )

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text(
                'Seller Registered Address:',
                40,
                270
            )

        doc.font('Helvetica')
            .fontSize(10)
            .text(
                'ThreadUp Fashion Pvt Ltd, 101-B, Raheja Plaza, Mumbai - 400086',
                40,
                285,
                {
                    width: 230
                }
            )

        doc.font('Helvetica-Bold')
            .text('E. & O.E.', 40, 330)

        let y = 370

        doc.font('Helvetica-Bold')
            .fontSize(10)

        doc.text('Product Description', 40, y)

        doc.text('Qty', 250, y)

        doc.text('Gross', 290, y)

        doc.text('Taxable', 350, y)

        doc.text('IGST', 430, y)

        doc.text('Total', 500, y)

        y += 18

        doc.moveTo(40, y)
            .lineTo(555, y)
            .stroke()

        y += 15

        doc.font('Helvetica')
            .fontSize(10)

        const products = orders.products

        let totalQty = 0

        products.forEach((product) => {

            const price = Number(product.newprice) || 0

            const qty = Number(product.quantity) || 0

            const grossAmount = price * qty

            const taxRate = grossAmount > 1000 ? 0.10 : 0.05

            const taxAmount = grossAmount * taxRate

            const taxableValue = grossAmount

            const total = taxableValue + taxAmount

            totalQty += qty

            doc.text(
                product.productName,
                40,
                y,
                {
                    width: 180
                }
            )

            doc.text(qty.toString(), 255, y)

            doc.text(
                grossAmount.toFixed(2),
                285,
                y
            )

            doc.text(
                taxableValue.toFixed(2),
                350,
                y
            )

            doc.text(
                taxAmount.toFixed(2),
                430,
                y
            )

            doc.text(
                total.toFixed(2),
                495,
                y
            )

            y += 40
        })

        const subTotal = products.reduce((total, item) => {

            const price = Number(item.newprice) || 0

            const qty = Number(item.quantity) || 0

            return total + (price * qty)

        }, 0)

        const shippingCharge =
            subTotal > 1500 ? 0 : 200

        const taxRate =
            subTotal > 1000 ? 0.10 : 0.05

        const taxAmount =
            subTotal * taxRate

        const finalTotal =
            subTotal + shippingCharge + taxAmount

        doc.text(
            'Shipping and Handling Charges',
            40,
            y
        )

        doc.text('1', 255, y)

        doc.text(
            shippingCharge.toFixed(2),
            285,
            y
        )

        doc.text(
            shippingCharge.toFixed(2),
            350,
            y
        )

        doc.text(
            '0.00',
            430,
            y
        )

        doc.text(
            shippingCharge.toFixed(2),
            495,
            y
        )

        y += 35

        doc.moveTo(40, y)
            .lineTo(555, y)
            .stroke()

      
        y += 20

        doc.font('Helvetica-Bold')
            .fontSize(11)

        doc.text(
            `TOTAL QTY: ${totalQty}`,
            40,
            y
        )

        doc.text(
            `TOTAL PRICE: ${finalTotal.toFixed(2)}`,
            380,
            y
        )

        y += 40

        doc.font('Helvetica')
            .fontSize(10)

        doc.text(
            'All values are in INR',
            40,
            y
        )

        doc.font('Helvetica-Bold')

        doc.image(
            './images/threduplogo.jpg',
            400,
            y + 10,
            {
                width: 90
            }
        )

        doc.end()
    })
}

module.exports = { GSTpdf }