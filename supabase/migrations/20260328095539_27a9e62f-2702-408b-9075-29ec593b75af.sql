
-- Marketplace listings table
CREATE TABLE public.marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL DEFAULT 'listing',
  crop text NOT NULL,
  quantity text NOT NULL,
  price text NOT NULL,
  location text,
  description text,
  category text DEFAULT 'Cereals',
  status text DEFAULT 'pending',
  image_url text,
  media_urls text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved listings" ON public.marketplace_listings
  FOR SELECT TO authenticated USING (status = 'approved' OR user_id = auth.uid());

CREATE POLICY "Users can create listings" ON public.marketplace_listings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings" ON public.marketplace_listings
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings" ON public.marketplace_listings
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Community videos table
CREATE TABLE public.community_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  author_name text NOT NULL DEFAULT 'Farmer',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.community_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view videos" ON public.community_videos
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can upload videos" ON public.community_videos
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own videos" ON public.community_videos
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('marketplace', 'marketplace', true);

-- Storage policies for videos
CREATE POLICY "Anyone can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can upload videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Users can delete own videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Storage policies for marketplace
CREATE POLICY "Anyone can view marketplace images" ON storage.objects FOR SELECT USING (bucket_id = 'marketplace');
CREATE POLICY "Authenticated users can upload marketplace images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'marketplace');
CREATE POLICY "Users can delete own marketplace images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'marketplace' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Add trigger for updated_at on marketplace
CREATE TRIGGER update_marketplace_listings_updated_at
  BEFORE UPDATE ON public.marketplace_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
