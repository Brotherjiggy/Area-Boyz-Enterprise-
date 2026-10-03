# Area Boyz Enterprise ג€” replacement build

Replace:
- `index.html`
- `css/style.css`
- `js/app.js`

Copy the supplied `images/catalog/` folder into the project.

## Flutterwave
1. Create the `orders` table with `supabase/schema.sql`.
2. Deploy `supabase/functions/create-payment` and `supabase/functions/verify-payment`.
3. Set Supabase secrets `FLW_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Put your Supabase project URL in `js/app.js` as `CONFIG.supabaseUrl`.
5. Never put `FLW_SECRET_KEY` in frontend code.

The frontend creates a hosted Flutterwave checkout through the Edge Function. The server stores a pending order before creating the link. A separate verification function verifies status, tx_ref, currency and amount before marking the order paid.
