import { getCustomer } from "~/data/subscription";


export async function POST(req: Request) {
    if ( req.method !== 'POST' ) return new Response('Method Not Allowed', { headers: { Allow: 'POST' }, status: 405 });

    // 1. Destructure the sessionId and quantity from the POST body
    const { customerId } = await req.json() as {customerId : string };

    const customer = await getCustomer(customerId);

    //If all else fails, return a 500 error
    if(!customer){
        return new Response( JSON.stringify({ error: { statusCode: 500, message: 'Session could not be defined' } }), { status: 500 } );
    }

    return new Response(JSON.stringify({ email: customer?.email }), { status: 200 });

}
