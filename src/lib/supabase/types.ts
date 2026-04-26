/**
 * Database types for BRUUX Supabase project.
 * Matches the schema defined in CLAUDE.md §SUPABASE DATABASE SCHEMA + admin_users.
 *
 * Regenerate with `supabase gen types typescript --project-id <id>` once
 * the schema is deployed.
 */

export type EventType = "night-class" | "pool-party" | "soiree-speciale";
export type EventStatus = "upcoming" | "sold-out" | "completed";
export type ArticleCategory =
  | "vlogs"
  | "courts-metrages"
  | "jeux-soirees"
  | "backstage"
  | "lifestyle"
  | "special";
export type PhotoCategory =
  | "sessions"
  | "evenements"
  | "brux-house"
  | "portraits";
export type MemberSection =
  | "direction"
  | "division-artistique"
  | "mannequins"
  | "influenceurs"
  | "section-a";

export type EventRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  date: string;
  end_date: string | null;
  location: string | null;
  type: EventType | null;
  image_url: string | null;
  price: string | null;
  status: EventStatus;
  whatsapp_link: string | null;
  created_at: string;
};

export type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: ArticleCategory | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type PhotoRow = {
  id: string;
  title: string | null;
  image_url: string;
  category: PhotoCategory | null;
  session_name: string | null;
  session_date: string | null;
  created_at: string;
};

export type MemberRow = {
  id: string;
  name: string;
  role: string | null;
  section: MemberSection | null;
  photo_url: string | null;
  instagram: string | null;
  display_order: number;
  created_at: string;
};

export type SubscriberRow = {
  id: string;
  email: string;
  subscribed_at: string;
};

export type AdminUserRow = {
  user_id: string;
  display_name: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      events: {
        Row: EventRow;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          date: string;
          end_date?: string | null;
          location?: string | null;
          type?: EventType | null;
          image_url?: string | null;
          price?: string | null;
          status?: EventStatus;
          whatsapp_link?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          date?: string;
          end_date?: string | null;
          location?: string | null;
          type?: EventType | null;
          image_url?: string | null;
          price?: string | null;
          status?: EventStatus;
          whatsapp_link?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: ArticleRow;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          cover_image?: string | null;
          category?: ArticleCategory | null;
          author?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          cover_image?: string | null;
          category?: ArticleCategory | null;
          author?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      photos: {
        Row: PhotoRow;
        Insert: {
          id?: string;
          title?: string | null;
          image_url: string;
          category?: PhotoCategory | null;
          session_name?: string | null;
          session_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string | null;
          image_url?: string;
          category?: PhotoCategory | null;
          session_name?: string | null;
          session_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      members: {
        Row: MemberRow;
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          section?: MemberSection | null;
          photo_url?: string | null;
          instagram?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          section?: MemberSection | null;
          photo_url?: string | null;
          instagram?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      subscribers: {
        Row: SubscriberRow;
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
        };
        Relationships: [];
      };
      admin_users: {
        Row: AdminUserRow;
        Insert: {
          user_id: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          display_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
