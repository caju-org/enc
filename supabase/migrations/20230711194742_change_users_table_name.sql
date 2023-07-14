drop policy "Enable insert for authenticated users only" on "public"."users";

alter table "public"."users" drop constraint "users_auth_user_id_fkey";

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."users_pkey";

drop table "public"."users";

create table "public"."profiles" (
    "id" uuid not null default uuid_generate_v4(),
    "first_name" character varying,
    "last_name" character varying,
    "auth_user_id" uuid
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX users_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."profiles" add constraint "profiles_auth_user_id_fkey" FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_auth_user_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."sectors"
as permissive
for insert
to authenticated
with check (true);



