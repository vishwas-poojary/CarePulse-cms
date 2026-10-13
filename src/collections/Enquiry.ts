import type { CollectionConfig } from 'payload'

export const Enquiry: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'patientName',
    defaultColumns: ['patientName', 'email', 'phone', 'preferredDepartment', 'createdAt'],
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
      name: 'patientName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'preferredDepartment',
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
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
