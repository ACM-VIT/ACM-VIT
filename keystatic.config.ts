import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'ACM VIT CMS',
    },
  },

  singletons: {
    // ─── Blogs ──────────────────────────────────────────────
    blogs: singleton({
      label: 'Blogs',
      path: 'src/content/blogs',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            link: fields.text({ label: 'Blog URL', validation: { isRequired: true, length: { min: 1 } } }),
            cover: fields.image({ label: 'Cover Image', directory: 'public/blogs', publicPath: '/blogs/', description: 'Leave empty to auto-fetch from Hashnode' }),
          }),
          {
            label: 'Blog Entry',
            itemLabel: (props) => props.fields.link.value || 'New Blog',
          }
        ),
      },
    }),

    // ─── Board Members ──────────────────────────────────────
    board: singleton({
      label: 'Board Members',
      path: 'src/content/board',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Title (e.g. Dr.)' }),
            fullName: fields.text({ label: 'Full Name', validation: { isRequired: true, length: { min: 1 } } }),
            position: fields.text({ label: 'Position', validation: { isRequired: true, length: { min: 1 } } }),
            imageUrl: fields.image({ label: 'Photo', directory: 'public/board', publicPath: '/board/' }),
            linkedinUrl: fields.text({ label: 'LinkedIn URL' }),
            googleScholarUrl: fields.text({ label: 'Google Scholar URL' }),
            githubUrl: fields.text({ label: 'GitHub URL' }),
            isW: fields.checkbox({ label: 'ACM-W Member', defaultValue: false }),
          }),
          {
            label: 'Board Member',
            itemLabel: (props) => {
              const title = props.fields.title.value;
              const name = props.fields.fullName.value;
              const position = props.fields.position.value;
              return `${title ? title + ' ' : ''}${name || 'New Member'} — ${position || ''}`;
            },
          }
        ),
      },
    }),

    // ─── Projects ───────────────────────────────────────────
    projects: singleton({
      label: 'Projects',
      path: 'src/content/projects',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            cassetteSrc: fields.image({ label: 'Cassette Image', directory: 'public/projects', publicPath: '/projects/' }),
            cassetteAlt: fields.text({ label: 'Cassette Alt Text', validation: { isRequired: true, length: { min: 1 } } }),
            description1: fields.text({ label: 'Description Block 1', multiline: true, validation: { isRequired: true, length: { min: 1 } } }),
            description2: fields.text({ label: 'Description Block 2', multiline: true }),
            primaryBgColor: fields.text({ label: 'Primary Button Background Color', validation: { isRequired: true, length: { min: 1 } } }),
            primaryTextColor: fields.text({ label: 'Primary Button Text Color', defaultValue: 'white' }),
            primaryBorderColor: fields.text({ label: 'Primary Button Border Color', defaultValue: '#FEFCD9' }),
            primaryBorderRadius: fields.text({ label: 'Primary Button Border Radius' }),
            visitWebsiteText: fields.text({ label: 'Visit Website Button Text', defaultValue: 'VISIT WEBSITE' }),
            visitWebsiteUrl: fields.text({ label: 'Visit Website URL' }),
            visitWebsiteBgColor: fields.text({ label: 'Visit Website Button Background' }),
            visitWebsiteTextColor: fields.text({ label: 'Visit Website Text Color', defaultValue: 'white' }),
            visitWebsiteBorderColor: fields.text({ label: 'Visit Website Border Color', defaultValue: '#FEFCD9' }),
            visitWebsiteBorderRadius: fields.text({ label: 'Visit Website Border Radius' }),
            icons: fields.array(
              fields.object({
                type: fields.text({ label: 'Icon Type (e.g. github)' }),
                backgroundColor: fields.text({ label: 'Background Color' }),
                textColor: fields.text({ label: 'Text Color' }),
                borderColor: fields.text({ label: 'Border Color' }),
                iconColor: fields.text({ label: 'Icon Color' }),
                borderRadius: fields.text({ label: 'Border Radius' }),
                url: fields.text({ label: 'URL' }),
              }),
              {
                label: 'Icon Button',
                itemLabel: (props) => props.fields.type.value || 'New Icon',
              }
            ),
            textColor: fields.text({ label: 'Text Color', defaultValue: 'white' }),
            contentBlockBackground: fields.text({ label: 'Content Block Background', defaultValue: 'rgba(0, 0, 0, 0.15)' }),
            hoverShadow: fields.text({ label: 'Hover Shadow Color' }),
          }),
          {
            label: 'Project',
            itemLabel: (props) => props.fields.cassetteAlt.value || 'New Project',
          }
        ),
      },
    }),

    // ─── Events ─────────────────────────────────────────────
    events: singleton({
      label: 'Events',
      path: 'src/content/events',
      format: { data: 'json' },
      schema: {
        cassetteImages: fields.array(
          fields.image({ label: 'Cassette Image', directory: 'public/events', publicPath: '/events/' }),
          {
            label: 'Cassette Image',
            itemLabel: (props) => props.value || 'New Image',
          }
        ),
        info: fields.array(
          fields.object({
            key: fields.text({ label: 'Key (e.g. Event1)', validation: { isRequired: true, length: { min: 1 } } }),
            title: fields.text({ label: 'Title', validation: { isRequired: true, length: { min: 1 } } }),
            site: fields.text({ label: 'Website URL' }),
            description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true, length: { min: 1 } } }),
          }),
          {
            label: 'Event Info',
            itemLabel: (props) => props.fields.title.value || 'New Event',
          }
        ),
      },
    }),

    // ─── Domains ────────────────────────────────────────────
    domains: singleton({
      label: 'Domains',
      path: 'src/content/domains',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            key: fields.text({ label: 'Key (e.g. tech, cc, design)', validation: { isRequired: true, length: { min: 1 } } }),
            title: fields.text({ label: 'Title', validation: { isRequired: true, length: { min: 1 } } }),
            description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true, length: { min: 1 } } }),
            themeColor: fields.text({ label: 'Theme Color Key', validation: { isRequired: true, length: { min: 1 } } }),
            cassetteSvg: fields.image({ label: 'Cassette Image', directory: 'public', publicPath: '/' }),
            buttonText: fields.text({ label: 'Button Text (leave empty to hide)' }),
            techIcons: fields.array(
              fields.object({
                src: fields.image({ label: 'Icon Image', directory: 'public/domains', publicPath: '/domains/' }),
                alt: fields.text({ label: 'Alt Text' }),
              }),
              {
                label: 'Tech Icon',
                itemLabel: (props) => props.fields.alt.value || 'New Icon',
              }
            ),
            aois: fields.array(
              fields.object({
                src: fields.image({ label: 'AOI Image', directory: 'public/AOIs', publicPath: '/AOIs/' }),
                alt: fields.text({ label: 'Alt Text' }),
              }),
              {
                label: 'Area of Interest',
                itemLabel: (props) => props.fields.alt.value || 'New AOI',
              }
            ),
          }),
          {
            label: 'Domain',
            itemLabel: (props) => props.fields.title.value || 'New Domain',
          }
        ),
      },
    }),

    // ─── Partners ───────────────────────────────────────────
    partners: singleton({
      label: 'Partners',
      path: 'src/content/partners',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Partner Name', validation: { isRequired: true, length: { min: 1 } } }),
            imageUrl: fields.image({ label: 'Image', directory: 'public/partners', publicPath: '/partners/' }),
            link: fields.text({ label: 'Website Link' }),
          }),
          {
            label: 'Partner',
            itemLabel: (props) => props.fields.title.value || 'New Partner',
          }
        ),
      },
    }),

    // ─── Speakers ───────────────────────────────────────────
    speakers: singleton({
      label: 'Distinguished Speakers',
      path: 'src/content/speakers',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Name', validation: { isRequired: true, length: { min: 1 } } }),
            subtitle: fields.text({ label: 'Subtitle' }),
            role: fields.text({ label: 'Role / Title' }),
            image: fields.image({ label: 'Image', directory: 'public/community', publicPath: '/community/' }),
            sessionTitle: fields.text({ label: 'Session Title (Line 1)' }),
            sessionTitleHighlight: fields.text({ label: 'Session Title Highlight (Line 2)' }),
            description: fields.array(
              fields.text({ label: 'Paragraph', multiline: true }),
              {
                label: 'Description Paragraph',
                itemLabel: (props) => (props.value || 'New Paragraph').substring(0, 60) + '...',
              }
            ),
          }),
          {
            label: 'Speaker',
            itemLabel: (props) => props.fields.name.value || 'New Speaker',
          }
        ),
      },
    }),

    // ─── Site Config (Legend) ────────────────────────────────
    siteConfig: singleton({
      label: 'Site Config',
      path: 'src/content/site-config',
      format: { data: 'json' },
      schema: {
        buttonText: fields.text({ label: 'Legend Button Text', defaultValue: 'CHECK OUT GREP' }),
        buttonLink: fields.text({ label: 'Legend Button Link', defaultValue: '/grep' }),
      },
    }),
  },
});
