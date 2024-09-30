import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const cartItems = await request.json();
    const origin = request.headers.get('origin');

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1Q4aAvA4Ic3msS9VrDfs2uz4' },
                { shipping_rate: 'shr_1Q4aD1A4Ic3msS9VJLUpoOi5' }
            ],
            line_items: cartItems.map(item => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/qm1dlvem/production/').replace('-web', '.webp');

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [newImage]
                        },
                        unit_amount: item.price * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${origin}/success`,
            cancel_url: `${origin}/canceled`,
        };

        const session = await stripe.checkout.sessions.create(params);

        // Return session as JSON
        return new Response(JSON.stringify({ id: session.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
