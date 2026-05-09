const PDFDocument = require('pdfkit');

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
            230,
            70
        )

        doc.text(
            `Invoice Date: ${formattedDate}`,
            230,
            85
        )

        doc.text(
            'GSTIN: 29ABCDE1234F1Z5',
            400,
            70
        )

        doc.moveTo(40, 145)
            .lineTo(555, 145)
            .stroke()

        doc.font('Helvetica-Bold')
            .fontSize(11)
            .text('Sold By', 40, 160)

        doc.font('Helvetica')
            .fontSize(10)

        doc.text('ThredUp Inc,', 40, 180)

        doc.text('New Marine Lines,', 40, 195)

        doc.text('Churchgate, Mumbai, Maharashtra - 400020', 40, 210)

        doc.text('Maharashtra - 400020', 40, 220)

        doc.text('GST: 29ABCDE1234F1Z5', 40, 235)

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

        let y = 270

        doc.font('Helvetica-Bold')
            .fontSize(10)

        doc.text('Product Description', 50, y)

        doc.text('Qty', 250, y)

        doc.text('Gross Amount', 305, y)

        doc.text('Taxable', 395, y)

        doc.text('IGST', 470, y)

        doc.text('Total', 525, y)

        y += 20

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
                50,
                y,
                {
                    width: 170
                }
            )

            doc.text(
                qty.toString(),
                255,
                y
            )

            doc.text(
                grossAmount.toFixed(2),
                300,
                y
            )

            doc.text(
                taxableValue.toFixed(2),
                390,
                y
            )

            doc.text(
                taxAmount.toFixed(2),
                470,
                y
            )

            doc.text(
                total.toFixed(2),
                520,
                y
            )

            y += 35
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
            'Shipping Charges',
            50,
            y
        )

        doc.text('1', 255, y)

        doc.text(
            shippingCharge.toFixed(2),
            300,
            y
        )

        doc.text(
            shippingCharge.toFixed(2),
            390,
            y
        )

        doc.text(
            '0.00',
            470,
            y
        )

        doc.text(
            shippingCharge.toFixed(2),
            520,
            y
        )

        y += 30

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
            `TOTAL PRICE: ₹${finalTotal.toFixed(2)}`,
            360,
            y
        )

        y += 40

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text(
                'Seller Registered Address:',
                40,
                y
            )

        y += 15

        doc.font('Helvetica')
            .fontSize(10)
            .text(
                'ThredUp Inc. HQ- 969 Broadway, Suite 200, Oakland, California, 94607',
                40,
                y,
                {
                    width: 300
                }
            )

        y += 50

        doc.font('Helvetica')
            .fontSize(10)

        doc.text(
            'All values are in INR',
            360,
            y
        )

        y += 25

        doc.font('Helvetica-Bold')
            .fontSize(10)

        doc.text(
            'Ordered Through',
            0,
            y,
            {
                align: 'center'
            }
        )

        y += 20

        const logoWidth = 70

        const pageWidth = doc.page.width

        const centerX = (pageWidth - logoWidth) / 2

        doc.image(
            './images/threduplogo.jpg',
            centerX,
            y,
            {
                width: logoWidth
            }
        )

        doc.end()
    })
}

module.exports = { GSTpdf }