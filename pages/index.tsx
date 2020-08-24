import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
import { format } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//import prismStyle from 'react-syntax-highlighter/styles/prism/xonokai'; style={prismStyle}>
import { print } from 'graphql/language/printer';

const ResumeQuery = gql`
  query ResumeQuery {
    bio {
      name
      tagline
      domain
      phone
      email
      github
      twitter
      linkedin
      objective
      summary
      dob
      education
      skills
    }
    positions {
      id
      title
      company
      location
      startDate
      endDate
      years
      months
      achievements
    }
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(ResumeQuery);

  if (error) {
    return <span> Error... Cannot load Resume </span>;
  }
  if (loading) {
    return (
      <header className={styles.header}>
        <h1> Kiran Kumar C </h1>
        <h2> Loading...</h2>
      </header>
    );
  }

  const { bio, positions } = data;

  return (
    <>
      <Head>
        <title>Resume of Kiran Kumar C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>{bio.name}</h1>
        <h2>{bio.tagline}</h2>
      </header>
      <div className={styles.split}>
        <div className={styles.left}>
          <h2> Date of Birth</h2>
          <p>{bio.dob}</p>
          <h2>Contact</h2>
          <p>
            <strong>Phone</strong> {bio.phone}
          </p>
          <p>
            <strong>Email</strong>{' '}
            <a className={styles.a} href={`mailto:${bio.email}`}>
              {bio.email}
            </a>
          </p>
          <p>
            <strong>GitHub</strong>{' '}
            <a className={styles.a} href={bio.github}>
              {bio.github.replace('https://', '')}
            </a>
          </p>
          <p>
            <strong>LinkedIn</strong>{' '}
            <a className={styles.a} href={bio.linkedin}>
              {bio.linkedin.replace(
                'https://www.linkedin.com/in/kiran-kumar-c-b406b247/',
                'linkedin.com/in/kiran/'
              )}
            </a>
          </p>
          <p>
            <strong>Twitter</strong>{' '}
            <a className={styles.a} href={bio.twitter}>
              {new URL(bio.twitter).host}
            </a>
          </p>
          <SyntaxHighlighter language="graphql">
            {print(ResumeQuery)}
          </SyntaxHighlighter>
        </div>
        <div className={styles.right}>
          <h2>Experience</h2>
          <p>{bio.objective}</p>
          <h2>Domains</h2>
          <p>{bio.domain}</p>
          <h2>Summary</h2>
          <p>
            <ul>
              {bio.summary.map((summaryString) => (
                <li key={summaryString}>{summaryString}</li>
              ))}
            </ul>
          </p>
          <h2>Competencies</h2>
          <p>
            <ul>
              {bio.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </p>
          <h2>Education Details</h2>
          <p>
            <ul>
              {bio.education.map((educationString) => (
                <li key={educationString}>{educationString}</li>
              ))}
            </ul>
          </p>
          <h2>Work Experience</h2>
          {positions.map((position) => {
            const length = [
              position.years > 0 ? `${position.years} yrs` : null,
              position.months > 0 ? `${position.months} mths` : null,
            ]
              .filter((str) => str)
              .join(' ');
            return (
              <div key={position.id}>
                <h3>{position.title}</h3>
                <p className={styles.light}>
                  {position.company} | {position.location}
                </p>
                <p className={styles.light}>
                  {format(new Date(position.startDate), 'MMM yyyy')} -{' '}
                  {position.endDate
                    ? format(new Date(position.endDate), 'MMM yyyy')
                    : 'Current'}{' '}
                  ({length})
                </p>
                <ul>
                  {position.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    </>
  );
}
