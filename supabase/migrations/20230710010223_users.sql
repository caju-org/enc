create table "public"."users" (
    "id" uuid not null default uuid_generate_v4(),
    "first_name" character varying,
    "last_name" character varying,
    "auth_user_id" uuid
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_auth_user_id_fkey" FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_auth_user_id_fkey";

create policy "Enable read access for all users"
on "public"."sectors"
as permissive
for select
to public
using (true);
