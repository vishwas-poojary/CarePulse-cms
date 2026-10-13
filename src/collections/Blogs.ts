import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'doctorName', 'status', 'publishedDate'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly unique identifier (e.g. healthy-heart-habits)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Heart Health', value: 'Heart Health' },
        { label: 'General Wellness', value: 'General Wellness' },
        { label: 'Pediatrics', value: 'Pediatrics' },
        { label: 'Mental Health', value: 'Mental Health' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'doctorName',
      type: 'text',
      defaultValue: 'Dr. Sarah Jenkins, MD',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short 2-sentence summary of the health article',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
