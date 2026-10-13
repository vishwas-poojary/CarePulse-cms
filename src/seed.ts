import 'dotenv/config'
import dns from 'node:dns'
if (typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
  } catch {
    // DNS fallback
  }
}

import { MongoClient } from 'mongodb'

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL is not defined. Please configure DATABASE_URL in your .env file.')
  process.exit(1)
}

const DATABASE_URL: string = process.env.DATABASE_URL

async function seed() {
  console.log('Connecting to MongoDB Atlas...')
  const client = new MongoClient(DATABASE_URL)
  await client.connect()
  const db = client.db('CarePulse')

  console.log('Connected! Checking and seeding data...')

  // 1. Seed or Update AboutUs Global
  const globalsCollection = db.collection('globals')
  const existingAboutUs = await globalsCollection.findOne({ slug: 'about-us' })
  const aboutUsData = {
    slug: 'about-us',
    clinicName: 'CarePulse Health Clinic',
    tagline: 'Trusted Healthcare for You and Your Family',
    mission:
      'To deliver state-of-the-art, evidence-based healthcare with deep clinical empathy, ensuring accessible, compassionate, and personalized treatments for patients across all stages of life.',
    vision:
      'To become the regional benchmark in multispeciality medical innovation, pioneering preventive care, diagnostic precision, and holistic patient recovery.',
    story: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Founded in 2011 by a team of visionary cardiologists and pediatric surgeons, CarePulse Health began with a singular promise: to bring world-class clinical precision and heartfelt human warmth under one roof.',
                type: 'text',
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Over the past 15 years, our multispeciality facility has grown from a humble neighborhood diagnostic center into a multidisciplinary healthcare network staffed by 25+ board-certified medical specialists. We have proudly served over 50,000 happy patients with compassionate consultations, outpatient surgery, advanced cardiology, pediatric intensive care, and preventive health screenings.',
                type: 'text',
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    keyStats: {
      yearsOfExperience: 15,
      specialistDoctors: 25,
      happyPatients: '50,000+',
    },
    updatedAt: new Date().toISOString(),
    createdAt: existingAboutUs?.createdAt || new Date().toISOString(),
  }

  if (existingAboutUs) {
    await globalsCollection.updateOne({ slug: 'about-us' }, { $set: aboutUsData })
    console.log('✓ Updated AboutUs global')
  } else {
    await globalsCollection.insertOne(aboutUsData)
    console.log('✓ Created AboutUs global')
  }

  // 2. Doctor-themed Blogs
  const blogsCollection = db.collection('blogs')
  const sampleBlogs = [
    {
      title: '10 Proven Daily Habits for a Healthy, Resilient Heart',
      slug: 'healthy-heart-habits',
      category: 'Heart Health',
      doctorName: 'Dr. Sarah Jenkins, MD (Cardiology)',
      excerpt:
        'Discover cardiologist-approved lifestyle modifications, nutrition tips, and aerobic benchmarks to safeguard your cardiovascular vitality and lower arterial pressure.',
      publishedDate: new Date('2026-09-20T09:00:00.000Z'),
      status: 'published',
      content: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Your heart beats over 100,000 times each day, pumping gallons of oxygen-rich blood through thousands of miles of vessels. Protecting this vital engine requires consistent, science-backed lifestyle choices.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                  text: '1. Prioritize 150 Minutes of Moderate Aerobic Movement Weekly\n',
                  type: 'text',
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Brisk walking, swimming, and cycling strengthen the myocardium, improve vascular elasticity, and help regulate blood pressure.\n\n',
                  type: 'text',
                  version: 1,
                },
                {
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                  text: '2. Embrace the Mediterranean Dietary Blueprint\n',
                  type: 'text',
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Incorporate extra virgin olive oil, cold-water omega-3 rich fish, leafy greens, walnuts, and legumes while limiting ultra-processed sodium loads.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
    },
    {
      title: 'Essential Pediatric Milestones: What Parents Should Expect from 0 to 5',
      slug: 'pediatric-developmental-milestones',
      category: 'Pediatrics',
      doctorName: 'Dr. Marcus Vance, FAAP (Chief Pediatrician)',
      excerpt:
        'A comprehensive clinical breakdown of cognitive, motor, and speech developmental benchmarks in early childhood, plus when to seek pediatric consultation.',
      publishedDate: new Date('2026-09-22T10:30:00.000Z'),
      status: 'published',
      content: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: "Every child develops at their unique pace, yet understanding neurodevelopmental benchmarks empowers parents to nurture their child's cognitive and physical milestones with confidence.",
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Regular wellness visits, timely pediatric immunizations, and responsive sensory play form the tripartite foundation of robust childhood resilience and immune system maturity.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
    },
    {
      title: 'Mind-Body Synchronization: Overcoming Chronic Stress and Burnout',
      slug: 'overcoming-chronic-stress-burnout',
      category: 'Mental Health',
      doctorName: 'Dr. Elena Rostova, PhD (Neuropsychiatry)',
      excerpt:
        'Understanding how sustained cortisol elevation impacts sleep architecture and gut health, alongside cognitive strategies for nervous system regulation.',
      publishedDate: new Date('2026-09-25T14:15:00.000Z'),
      status: 'published',
      content: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Chronic sympathetic nervous system activation disrupts restorative REM cycles and systemic inflammation markers. Clinical mindfulness and parasympathetic breath training offer tangible relief.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
    },
    {
      title: 'Optimal Cellular Hydration and Nutrient Absorption for Longevity',
      slug: 'optimal-cellular-hydration-longevity',
      category: 'General Wellness',
      doctorName: 'Dr. Aris Thorne, MD (General & Preventive Medicine)',
      excerpt:
        'Why cellular electrolyte equilibrium matters more than simple fluid volume, and how micro-nutrient timing maximizes metabolic performance throughout the day.',
      publishedDate: new Date('2026-09-28T11:00:00.000Z'),
      status: 'published',
      content: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Water alone is not always enough for cellular hydration. When combined with balanced potassium, sodium, and magnesium minerals, hydration supports cognitive clarity and enzymatic activity.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
    },
  ]

  for (const blog of sampleBlogs) {
    const existing = await blogsCollection.findOne({ slug: blog.slug })
    if (existing) {
      await blogsCollection.updateOne(
        { slug: blog.slug },
        {
          $set: {
            ...blog,
            updatedAt: new Date().toISOString(),
          },
        }
      )
      console.log(`✓ Updated blog: ${blog.title}`)
    } else {
      await blogsCollection.insertOne({
        ...blog,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      console.log(`✓ Inserted blog: ${blog.title}`)
    }
  }

  // 3. Seed Sample Patient Enquiries if empty
  const enquiriesCollection = db.collection('enquiries')
  const count = await enquiriesCollection.countDocuments()
  if (count === 0) {
    await enquiriesCollection.insertMany([
      {
        patientName: 'Eleanor Vance',
        email: 'eleanor.vance@example.com',
        phone: '+1 (555) 234-5678',
        preferredDepartment: 'Cardiology',
        message: 'Looking for a comprehensive cardiovascular health assessment and ECG checkup.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        patientName: 'David Miller',
        email: 'david.miller@example.com',
        phone: '+1 (555) 876-5432',
        preferredDepartment: 'Pediatrics',
        message: 'Seeking a 2-year pediatric milestone screening and routine immunization appointment.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    console.log('✓ Inserted sample patient enquiries')
  } else {
    console.log(`✓ Enquiries already present (${count} records)`)
  }

  // 4. Seed Doctors collection
  const doctorsCollection = db.collection('doctors')
  const initialDoctors = [
    {
      name: 'Dr. Sarah Jenkins, MD, FACC',
      title: 'Senior Consultant & Chief of Cardiology',
      department: 'Cardiology',
      experience: '16+ Years',
      focus: 'Preventive Cardiology & 4D Echo Diagnostics',
      imageUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: '4.95',
      availableToday: true,
      order: 1,
    },
    {
      name: 'Dr. Marcus Vance, FAAP',
      title: 'Chief Pediatrician & Neonatologist',
      department: 'Pediatrics',
      experience: '14+ Years',
      focus: 'Neonatal Care & Pediatric Pulmonology',
      imageUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: '4.98',
      availableToday: true,
      order: 2,
    },
    {
      name: 'Dr. Aris Thorne, MD',
      title: 'Lead Internist & Preventive Medicine Specialist',
      department: 'General Medicine',
      experience: '12+ Years',
      focus: 'Metabolic Health & Longevity Medicine',
      imageUrl: 'https://images.pexels.com/photos/6234977/pexels-photo-6234977.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: '4.92',
      availableToday: false,
      order: 3,
    },
    {
      name: 'Dr. Chloe Martinez, DDS',
      title: 'Chief Dental & Orthodontic Surgeon',
      department: 'Dental',
      experience: '10+ Years',
      focus: 'Aesthetic Dentistry & Dental Implants',
      imageUrl: 'https://images.pexels.com/photos/6529116/pexels-photo-6529116.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: '4.96',
      availableToday: true,
      order: 4,
    },
    {
      name: 'Dr. Elena Rostova, PhD, MD',
      title: 'Head of Neuropsychiatry & Cognitive Health',
      department: 'Neurology',
      experience: '15+ Years',
      focus: 'Clinical Neuroscience & Stress Mitigation',
      imageUrl: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: '4.94',
      availableToday: true,
      order: 5,
    },
    {
      name: 'Dr. Liam Montgomery, MD, FACS',
      title: 'Lead Orthopedic & Sports Medicine Surgeon',
      department: 'Orthopedics',
      experience: '18+ Years',
      focus: 'Minimally Invasive Joint Replacement & Rehab',
      imageUrl: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: '4.97',
      availableToday: false,
      order: 6,
    },
  ]

  for (const doc of initialDoctors) {
    const existing = await doctorsCollection.findOne({ name: doc.name })
    if (existing) {
      await doctorsCollection.updateOne(
        { name: doc.name },
        {
          $set: {
            ...doc,
            updatedAt: new Date().toISOString(),
          },
        }
      )
      console.log(`✓ Updated doctor: ${doc.name}`)
    } else {
      await doctorsCollection.insertOne({
        ...doc,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      console.log(`✓ Inserted doctor: ${doc.name}`)
    }
  }

  // 5. Seed Departments collection
  const deptCollection = db.collection('departments')
  const initialDepartments = [
    {
      name: 'Cardiology & Heart Care',
      departmentKey: 'Cardiology',
      shortDescription:
        'Advanced ECG, echocardiography, preventive vascular evaluations, and cardiac rehabilitation.',
      icon: 'Activity',
      order: 1,
      active: true,
    },
    {
      name: 'Pediatrics & Child Health',
      departmentKey: 'Pediatrics',
      shortDescription:
        'From newborn neonatal care to adolescent wellness, milestone tracking, and routine vaccinations.',
      icon: 'Baby',
      order: 2,
      active: true,
    },
    {
      name: 'General & Internal Medicine',
      departmentKey: 'General Medicine',
      shortDescription:
        'Comprehensive adult diagnostics, chronic disease management, and full-body preventive health checkups.',
      icon: 'Stethoscope',
      order: 3,
      active: true,
    },
    {
      name: 'Comprehensive Dental Clinic',
      departmentKey: 'Dental',
      shortDescription:
        'Pediatric dentistry, cosmetic restorations, orthodontics, and restorative oral surgery.',
      icon: 'Sparkles',
      order: 4,
      active: true,
    },
    {
      name: 'Orthopedics & Joint Care',
      departmentKey: 'Orthopedics',
      shortDescription:
        'Joint replacement, arthroscopic surgery, sports medicine, and specialized rehabilitation therapy.',
      icon: 'Bone',
      order: 5,
      active: true,
    },
    {
      name: 'Neuropsychiatry & Wellness',
      departmentKey: 'Neurology',
      shortDescription:
        'Cognitive behavioral support, neurological evaluations, and burnout mitigation therapies.',
      icon: 'Brain',
      order: 6,
      active: true,
    },
  ]

  for (const dept of initialDepartments) {
    const existing = await deptCollection.findOne({ departmentKey: dept.departmentKey })
    if (existing) {
      await deptCollection.updateOne(
        { departmentKey: dept.departmentKey },
        {
          $set: {
            ...dept,
            updatedAt: new Date().toISOString(),
          },
        }
      )
      console.log(`✓ Updated department: ${dept.name}`)
    } else {
      await deptCollection.insertOne({
        ...dept,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      console.log(`✓ Inserted department: ${dept.name}`)
    }
  }

  console.log('Database seeding successfully finished!')
  await client.close()
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
