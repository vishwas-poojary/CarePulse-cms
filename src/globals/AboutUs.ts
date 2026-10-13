import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  label: 'About Clinic',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'clinicName',
      type: 'text',
      defaultValue: 'CarePulse Health Clinic',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Trusted Healthcare for You and Your Family',
    },
    {
      name: 'story',
      type: 'richText',
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mission',
      type: 'textarea',
      defaultValue:
        'To provide compassionate, patient-centered, and evidence-based multispeciality healthcare that enhances the quality of life for all individuals and families in our community.',
    },
    {
      name: 'vision',
      type: 'textarea',
      defaultValue:
        'To be the leading multispeciality healthcare sanctuary recognized for medical excellence, cutting-edge technology, and unparalleled patient empathy.',
    },
    {
      name: 'keyStats',
      type: 'group',
      fields: [
        {
          name: 'yearsOfExperience',
          type: 'number',
          defaultValue: 15,
        },
        {
          name: 'specialistDoctors',
          type: 'number',
          defaultValue: 25,
        },
        {
          name: 'happyPatients',
          type: 'text',
          defaultValue: '50,000+',
        },
      ],
    },
  ],
}
