import { objectType } from '@nexus/schema';

export const Bio = objectType({
  name: 'Bio',
  definition(t) {
    t.string('name');
    t.string('tagline');
    t.string('domain');
    t.string('phone');
    t.string('email');
    t.string('objective');
    t.list.string('summary', (bio) => bio.summary);
    t.url('github', (bio) => new URL(bio.github));
    t.url('twitter', (bio) => new URL(bio.twitter));
    t.url('linkedin', (bio) => new URL(bio.linkedin));
    t.string('dob');
    t.list.string('education', (bio) => bio.education);
    t.list.string('skills', (bio) => bio.skills);
  },
});
