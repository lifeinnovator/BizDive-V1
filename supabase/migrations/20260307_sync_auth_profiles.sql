-- Migration: Sync Auth Users to Profiles
-- Date: 2026-03-07

-- 1. Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, user_name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'user_name',
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    user_name = COALESCE(EXCLUDED.user_name, profiles.user_name),
    updated_at = NOW();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Comment for documentation
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates or updates a profile record when an auth user is created.';
