create policy "Enable insert for authenticated users only"
on "public"."climb_routes"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."conquerors"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."routes_conquerors"
as permissive
for insert
to authenticated
using (true);



