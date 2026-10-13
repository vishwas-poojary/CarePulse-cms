import type { CollectionConfig } from 'payload'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'departmentKey', 'icon', 'order', 'active'],
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
      label: 'Department Name (e.g. Cardiology & Heart Care)',
    },
    {
      name: 'departmentKey',
      type: 'select',
      required: true,
      label: 'Booking Department Category',
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
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Overview for Portal',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: 'Lucide Icon Identifier',
      options: [
        { label: 'Activity (Cardiology / Heart)', value: 'Activity' },
        { label: 'Baby (Pediatrics / Neonatology)', value: 'Baby' },
        { label: 'Stethoscope (General / Internal Medicine)', value: 'Stethoscope' },
        { label: 'Sparkles (Dental / Aesthetic)', value: 'Sparkles' },
        { label: 'Bone (Orthopedics / Spine)', value: 'Bone' },
        { label: 'Brain (Neurology / Neuropsychiatry)', value: 'Brain' },
      ],
      defaultValue: 'Stethoscope',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 1,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active & Displayed on Website',
      defaultValue: true,
    },
  ],
}
