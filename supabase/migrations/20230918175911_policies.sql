alter table "public"."cities" enable row level security;

alter table "public"."climb_routes" enable row level security;

alter table "public"."conquerors" enable row level security;

alter table "public"."profiles" enable row level security;

alter table "public"."routes_conquerors" enable row level security;

alter table "public"."sectors" enable row level security;

alter table "public"."states" enable row level security;

create policy "Enable read access for all users"
on "public"."cities"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."climb_routes"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."conquerors"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."sectors"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."sectors"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."states"
as permissive
for select
to public
using (true);



