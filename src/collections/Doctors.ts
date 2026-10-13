import type { CollectionConfig } from 'payload'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'department', 'title', 'availableToday', 'rating', 'order'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Doctor Full Name & Credentials',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Clinical Designation / Title',
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Cardiology', value: 'Cardiology' },
        { label: 'Pediatrics', value: 'Pediatrics' },
        { label: 'General Medicine', value: 'General Medicine' },
        { label: 'Dental', value: 'Dental' },
        { label: 'Orthopedics', value: 'Orthopedics' },
        { label: 'Neurology', value: 'Neurology' },
      ],
    },
    {
      name: 'experience',
      type: 'text',
      required: true,
      label: 'Clinical Experience (e.g. 16+ Years)',
      defaultValue: '10+ Years',
    },
    {
      name: 'focus',
      type: 'text',
      required: true,
      label: 'Core Focus / Subspecialty',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Doctor Portrait Image URL (or upload below)',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Doctor Portrait Media File',
    },
    {
      name: 'rating',
      type: 'text',
      label: 'Patient Rating (e.g. 4.95)',
      defaultValue: '4.95',
    },
    {
      name: 'availableToday',
      type: 'checkbox',
      label: 'Available for Consultation Today',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 1,
    },
  ],
}
