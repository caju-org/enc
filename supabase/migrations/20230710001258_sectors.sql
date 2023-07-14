create table "public"."sectors" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying,
    "city" character varying,
    "state" character varying,
    "description" text,
    "how_to_get_there" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."sectors" enable row level security;

CREATE UNIQUE INDEX sectors_pkey ON public.sectors USING btree (id);

alter table "public"."sectors" add constraint "sectors_pkey" PRIMARY KEY using index "sectors_pkey";


