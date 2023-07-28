create policy "Enable read access for all users"
on "public"."conquerors"
as permissive
for select
to public
using (true);



