import React from "react";
import type { Screen } from "../types";

type HomeProps = {
  styles: any;
  cardColors: string[];
  setScreen: (screen: Screen) => void;
};

function Home({ styles, cardColors, setScreen }: HomeProps) {
  return (

  <div>
    <header style={styles.header}>
      <div style={styles.nav}>
        <div style={styles.brand}>
          <img
            src="/nihongomate-logo.png"
            alt="NihongoMate Logo"
            style={{
              width: 44,
              height: 44,
              objectFit: "contain",
              borderRadius: 10
            }}
          />

          <span>
            Nihongo<span style={{ color: "#d9433d" }}>Mate</span>
          </span>
        </div>

        <nav style={styles.navActions}>
          <button
            style={styles.btnSecondary}
            onClick={() => setScreen("login")}
          >
            Log In
          </button>

          <button
            style={styles.btnPrimary}
            onClick={() => setScreen("signup")}
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>

    <main style={styles.main}>
      <section style={styles.hero}>
        <div>
          <span style={styles.eyebrow}>Your Japanese journey starts here</span>
          <h1 style={styles.h1}>
            Learn Japanese.
            <span style={{ color: "#d9433d", display: "block" }}>One step at a time.</span>
          </h1>

          <p style={styles.lead}>
            A welcoming place to learn Japanese from the very beginning.
            Understand the language, listen to real pronunciation and build your
            confidence through structured lessons.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <button style={styles.btnPrimary} onClick={() => setScreen("signup")}>
              Start Learning — It&apos;s Free
            </button>
            <button
              style={styles.btnSecondary}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Discover NihongoMate
            </button>
          </div>
        </div>

        <div style={styles.art}>
          <img
            src="/nihongomate-hero.png"
            alt="Your Japanese language journey begins here"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 28
            }}
          />
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <span style={styles.eyebrow}>Why NihongoMate?</span>
          <h2 style={{ fontSize: 38, margin: "18px 0 10px" }}>Learn at your own pace</h2>
          <p style={{ color: "#77727a", margin: 0 }}>
            Designed to make Japanese learning easier for beginners and continuing learners.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18 }}>
          {[
            { emoji: "📚", title: "Structured Lessons", text: "Start with the basics and gradually build your Japanese knowledge." },
            { emoji: "🔊", title: "Pronunciation Audio", text: "Listen to words and phrases to become familiar with how they sound." },
            { emoji: "🎓", title: "Teacher Community", text: "Learn through lessons created by teachers and reviewed educators." }
          ].map((feature) => (
            <article key={feature.title} style={styles.card}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.emoji}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 24 }}>{feature.title}</h3>
              <p style={{ margin: 0, color: "#77727a", lineHeight: 1.7 }}>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>


      <section id="about" style={styles.section}>
        <div style={styles.aboutBox}>
          <span style={styles.eyebrow}>ABOUT NIHONGOMATE</span>

          <h2 style={{ margin: "18px 0 14px", fontSize: 38 }}>
            Your Companion in Learning Japanese.
          </h2>

          <p style={{ color: "#77727a", lineHeight: 1.9 }}>
            NihongoMate is an online Japanese language learning platform
            designed to help learners develop their Japanese skills through
            structured lessons, vocabulary learning and pronunciation practice.
            Whether you are starting from zero or improving your existing
            knowledge, NihongoMate provides a learning environment where you
            can progress one step at a time.
          </p>

          <h3 style={{ marginTop: 30, marginBottom: 12 }}>Our Purpose</h3>
          <p style={{ color: "#77727a", lineHeight: 1.9 }}>
            Learning Japanese can be challenging because it involves three
            writing systems: Hiragana, Katakana and Kanji, along with grammar,
            vocabulary and pronunciation. Our purpose is to make this process
            easier by organising learning materials into understandable
            lessons and providing learners with a clear learning path.
          </p>

          <h3 style={{ marginTop: 30, marginBottom: 12 }}>Our Mission</h3>
          <p style={{ color: "#77727a", lineHeight: 1.9 }}>
            Our mission is to make Japanese language education accessible,
            engaging and organised for learners around the world. We aim to
            encourage consistent learning, build language confidence and
            support learners as they work towards their personal and
            professional goals.
          </p>

          <h3 style={{ marginTop: 30, marginBottom: 16 }}>
            What You Can Learn With NihongoMate
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 18
          }}>
            {[
              {
                emoji: "📚",
                title: "Structured Lessons",
                text: "Learn Japanese through organised lessons, starting with basic concepts and gradually progressing to more advanced topics."
              },
              {
                emoji: "🎯",
                title: "JLPT Learning Path",
                text: "Explore the five Japanese Language Proficiency Test levels, from N5 beginner to N1 advanced."
              },
              {
                emoji: "🈶",
                title: "Vocabulary Development",
                text: "Discover Japanese words with their readings, romaji, meanings and example sentences."
              },
              {
                emoji: "🔊",
                title: "Pronunciation Practice",
                text: "Listen to Japanese words and expressions using audio pronunciation support."
              },
              {
                emoji: "👩‍🏫",
                title: "Teacher Community",
                text: "Provide opportunities for qualified Japanese teachers to contribute their knowledge and educational content."
              },
              {
                emoji: "📈",
                title: "Learning Progress",
                text: "Keep track of completed introductory lessons and stay motivated throughout your learning journey."
              }
            ].map((item, index) => (
              <article
                key={item.title}
                style={{
                  ...styles.card,
                  padding: 22,
                  background: cardColors[index]
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>
                  {item.emoji}
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 20 }}>
                  {item.title}
                </h3>
                <p style={{ color: "#77727a", lineHeight: 1.8, margin: 0 }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: 30, marginBottom: 12 }}>
            Who Is NihongoMate For?
          </h3>
          <p style={{ color: "#77727a", lineHeight: 1.9 }}>
            NihongoMate is intended for students, beginners, university
            learners, travellers, working professionals and anyone interested
            in Japanese language and culture. It can support people preparing
            for JLPT examinations, planning to study or work in Japan, or
            simply exploring a new language.
          </p>

          <h3 style={{ marginTop: 30, marginBottom: 12 }}>
            Our Future Vision
          </h3>
          <p style={{ color: "#77727a", lineHeight: 1.9 }}>
            We envision developing NihongoMate into a comprehensive Japanese
            learning platform. Future improvements may include interactive
            quizzes, teacher-created video lessons, personalised study plans,
            AI-powered learning assistance and more advanced progress tracking.
            These developments aim to make learning more interactive and
            personalised.
          </p>

          <div style={{
            marginTop: 30,
            padding: 24,
            background: "white",
            borderRadius: 18,
            textAlign: "center"
          }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 24 }}>
              Start Your Japanese Journey Today!
            </h3>
            <p style={{ color: "#77727a", lineHeight: 1.8 }}>
              Every new language begins with a single word. Start learning
              Japanese with NihongoMate and take your next step towards
              understanding a new language and culture.
            </p>
            <button
              style={{ ...styles.btnPrimary, marginTop: 12 }}
              onClick={() => setScreen("signup")}
            >
              Start Learning →
            </button>
          </div>
        </div>
      </section>


      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <span style={styles.eyebrow}>Get in touch</span>
          <h2 style={{ fontSize: 38, margin: "18px 0 10px" }}>Contact NihongoMate</h2>
          <p style={{ color: "#77727a", margin: 0 }}>
            Have a question or interested in teaching? Contact our team.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div style={styles.contactCard}>
            <h3 style={{ margin: "0 0 12px" }}>General enquiries</h3>
            <p style={{ margin: 0, color: "#77727a", lineHeight: 1.7 }}>
              Questions, suggestions and feedback about the platform.
            </p>
            <strong style={{ display: "block", marginTop: 12 }}>hello@nihongomate.example</strong>
          </div>

          <div style={styles.contactCard}>
            <h3 style={{ margin: "0 0 12px" }}>Teacher applications</h3>
            <p style={{ margin: 0, color: "#77727a", lineHeight: 1.7 }}>
              For people interested in joining the NihongoMate teaching community.
            </p>
            <strong style={{ display: "block", marginTop: 12 }}>teachers@nihongomate.example</strong>
          </div>
        </div>
      </section>
    </main>

    <footer style={styles.footer}>© 2026 NihongoMate. Learn Japanese, one step at a time.</footer>
      </div>
  );
}

export default Home;