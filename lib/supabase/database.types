export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dance_styles: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          is_organizer: boolean
          is_admin: boolean
          is_verified: boolean
          dance_styles: string[]
          subscription_tier: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          is_organizer?: boolean
          is_admin?: boolean
          is_verified?: boolean
          dance_styles?: string[]
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          is_organizer?: boolean
          is_admin?: boolean
          is_verified?: boolean
          dance_styles?: string[]
          subscription_tier?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string | null
          country: string
          latitude: number | null
          longitude: number | null
          website: string | null
          phone: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code?: string | null
          country?: string
          latitude?: number | null
          longitude?: number | null
          website?: string | null
          phone?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string | null
          country?: string
          latitude?: number | null
          longitude?: number | null
          website?: string | null
          phone?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          organizer_id: string | null
          location_id: string | null
          start_time: string
          end_time: string
          price_range: string | null
          cover_image: string | null
          status: string
          is_featured: boolean
          is_last_minute: boolean
          has_live_dj: boolean
          is_beginner_friendly: boolean
          has_open_floor: boolean
          age_restriction: string | null
          dress_code: string | null
          amenities: string[] | null
          dance_styles: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          organizer_id?: string | null
          location_id?: string | null
          start_time: string
          end_time: string
          price_range?: string | null
          cover_image?: string | null
          status?: string
          is_featured?: boolean
          is_last_minute?: boolean
          has_live_dj?: boolean
          is_beginner_friendly?: boolean
          has_open_floor?: boolean
          age_restriction?: string | null
          dress_code?: string | null
          amenities?: string[] | null
          dance_styles?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          organizer_id?: string | null
          location_id?: string | null
          start_time?: string
          end_time?: string
          price_range?: string | null
          cover_image?: string | null
          status?: string
          is_featured?: boolean
          is_last_minute?: boolean
          has_live_dj?: boolean
          is_beginner_friendly?: boolean
          has_open_floor?: boolean
          age_restriction?: string | null
          dress_code?: string | null
          amenities?: string[] | null
          dance_styles?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_location_id_fkey"
            columns: ["location_id"]
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      event_images: {
        Row: {
          id: string
          event_id: string
          image_url: string
          is_cover: boolean
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          image_url: string
          is_cover?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          image_url?: string
          is_cover?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_images_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvps: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          event_id: string
          user_id: string
          rating: number
          comment: string | null
          music_rating: number | null
          crowd_rating: number | null
          venue_rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          rating: number
          comment?: string | null
          music_rating?: number | null
          crowd_rating?: number | null
          venue_rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          music_rating?: number | null
          crowd_rating?: number | null
          venue_rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_subscriptions: {
        Row: {
          id: string
          user_id: string
          email: string
          subscription_type: string
          is_subscribed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          subscription_type: string
          is_subscribed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          subscription_type?: string
          is_subscribed?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      event_tags_junction: {
        Row: {
          event_id: string
          tag_id: string
        }
        Insert: {
          event_id: string
          tag_id: string
        }
        Update: {
          event_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_tags_junction_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_tags_junction_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "event_tags"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
