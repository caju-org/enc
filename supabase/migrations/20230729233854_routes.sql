create table "public"."routes" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying,
    "sector_id" uuid not null,
    "modality" character varying,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."routes" enable row level security;

alter table "public"."conquerors" alter column "id" set default gen_random_uuid();

alter table "public"."conquerors" alter column "id" drop identity;

alter table "public"."conquerors" alter column "id" set data type uuid using "id"::uuid;

CREATE UNIQUE INDEX routes_pkey ON public.routes USING btree (id);

alter table "public"."routes" add constraint "routes_pkey" PRIMARY KEY using index "routes_pkey";

alter table "public"."routes" add constraint "routes_sector_id_fkey" FOREIGN KEY (sector_id) REFERENCES sectors(id) not valid;

alter table "public"."routes" validate constraint "routes_sector_id_fkey";


