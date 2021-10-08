## SIM Card Based Authentication with Supabase React Native and tru.ID PhoneCheck 

## Requirements

- A [tru.ID Account](https://tru.id)
- An [Supabase Account](https://app.supabase.io)
- A mobile phone with a SIM card and mobile data connection
## Getting Started

Clone the starter-files branch via:

```bash
git clone -b starter-files --single-branch https://github.com/tru-ID/supabase-passwordless-authentication.git
```

If you're only interested in the finished code in main then run:

```bash
git clone -b main https://github.com/tru-ID/supabase-passwordless-authentication.git
```

Create a [tru.ID Account](https://tru.id)

Install the tru.ID CLI via:

```bash
npm i -g @tru_id/cli

```

Input your **tru.ID** credentials which can be found within the tru.ID [console](https://developer.tru.id/console)

Install the **tru.ID** CLI [development server plugin](https://github.com/tru-ID/cli-plugin-dev-server)

Create a new **tru.ID** project within the root directory via:

```
tru projects:create rn-supabase-auth --project-dir .
```

Run the development server, pointing it to the directory containing the newly created project configuration. This will also open up a localtunnel to your development server making it publicly accessible to the Internet so that your mobile phone can access it when only connected to mobile data.

```
tru server -t
```
