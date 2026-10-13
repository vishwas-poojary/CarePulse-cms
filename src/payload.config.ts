import dns from 'dns'
if (typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
  } catch {
    // Fallback if environment restricts custom DNS
  }
}

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { Enquiry } from './collections/Enquiry'
import { Doctors } from './collections/Doctors'
import { Departments } from './collections/Departments'
import { AboutUs } from './globals/AboutUs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blogs, Enquiry, Doctors, Departments],
  globals: [AboutUs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  cors: ['http://localhost:4321', 'http://127.0.0.1:4321', 'http://localhost:3000', '*'],
  csrf: ['http://localhost:4321', 'http://127.0.0.1:4321', 'http://localhost:3000'],
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'carepulse/public/media',
        },
      },
      bucket: process.env.CLOUDFLARE_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.CLOUDFLARE_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})
