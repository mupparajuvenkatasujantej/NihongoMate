import React, { useEffect, useMemo, useState } from "react";
import { countryOptions, getCountryFlag, getCallingCode } from "./utils/country";
import { placementQuestions } from "./data/placementQuestions";
import { LESSONS } from "./data/lessons";
import { VOCABULARY } from "./data/vocabulary";
import { speakJapanese } from "./utils/speech";
import Home from "./pages/Home";
import type {
  Role,
  Screen,
  LevelKey,
  PresentLevel,
  UserAccount,
  Lesson,
  VocabularyItem,
} from "./types";

console.log("Total countries:", countryOptions.length);
console.log("Country list:", countryOptions);



const LEVELS: Record<LevelKey, { name: string; description: string }> = {
  N5: {
    name: "Basic Japanese",
    description:
      "N5 is the easiest JLPT level. It is for learners beginning to understand basic Japanese expressions, simple sentences, hiragana, katakana and basic kanji."
  },
  N4: {
    name: "Elementary Japanese",
    description:
      "N4 is for learners who can understand basic Japanese used in everyday situations, especially when the language is spoken slowly."
  },
  N3: {
    name: "Intermediate Japanese",
    description:
      "N3 is the bridge between basic and advanced Japanese. It measures the ability to understand Japanese used in everyday situations to a certain degree."
  },
  N2: {
    name: "Upper-intermediate Japanese",
    description:
      "N2 measures the ability to understand Japanese used in a wider range of everyday and other situations."
  },
  N1: {
    name: "Advanced Japanese",
    description:
      "N1 is the most advanced JLPT level. It measures the ability to understand Japanese used across a wide variety of situations."
  }
};

const INTRO = {
  title: "Your first introduction to Japanese",
  detail:
    "Japanese is the language spoken in Japan. It uses three writing systems: Hiragana, Katakana and Kanji. Hiragana is commonly used for native Japanese words and grammatical endings. Katakana is commonly used for foreign-origin words and names. Kanji are characters that represent meaning. You do not need to memorise everything today. We will learn step by step."
};

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [learningLevel, setLearningLevel] = useState<LevelKey>("N5");

  const [presentLevel, setPresentLevel] = useState<PresentLevel>("0");

  const [testScore, setTestScore] = useState<number | null>(null);

  const [testPassed, setTestPassed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(480);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("learner");
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>("N5");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [toast, setToast] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [vocabulary] = useState<VocabularyItem[]>(VOCABULARY);

  const cardColors = ["#fff7f2", "#f0f7f3", "#f4f1fb", "#fff8e8", "#eef6fa", "#fdf0f2"];

  useEffect(() => {
    const rawUser = localStorage.getItem("nihongomate_user");
    const rawProgress = localStorage.getItem("nihongomate_progress");

    const savedUser: UserAccount | null = rawUser ? JSON.parse(rawUser) : null;
    const savedProgress: Record<string, number> = rawProgress ? JSON.parse(rawProgress) : {};

    if (savedUser) {
      setUser(savedUser);
      setSelectedRole(savedUser.role);
      setSelectedLevel(savedUser.level || "N5");
      setPresentLevel(savedUser.presentLevel || "0");

      if (savedUser.role === "teacher") {
        setScreen("teacher");
      } else if (!savedUser.onboardingComplete) {
        setScreen("level");
      } else {
        setScreen("dashboard");
      }
    }

    const initialLessons = LESSONS.map((lesson) => ({
      ...lesson,
      progress: savedProgress[lesson.id] || 0,
      completed: (savedProgress[lesson.id] || 0) >= 100
    }));

    setProgress(savedProgress);
    setLessons(initialLessons);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (screen !== "placementTest") return;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [screen]);

  // Automatically submit the test when time runs out
  useEffect(() => {
    if (screen !== "placementTest" || timeLeft !== 0) {
      return;
    }

    const questions = placementQuestions[presentLevel] || [];

    const correctCount = questions.reduce(
      (total, item, index) =>
        total + (userAnswers[index] === item.correctAnswer ? 1 : 0),
      0
    );

    const score = correctCount * 10;
    const passed = correctCount >= 5;

    setTestScore(score);
    setTestPassed(passed);

    if (passed && user) {
      const updatedUser = {
        ...user,
        onboardingComplete: true
      };

      setUser(updatedUser);
      saveUser(updatedUser);
    }

    setScreen("testResults");
  }, [screen, timeLeft, presentLevel, userAnswers, user]);

  // Toast message timer
  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message: string) => setToast(message);

  const saveUser = (account: UserAccount | null) => {
    if (!account) {
      localStorage.removeItem("nihongomate_user");
      return;
    }

    localStorage.setItem("nihongomate_user", JSON.stringify(account));
  };

  const saveProgressState = (next: Record<string, number>) => {
    localStorage.setItem("nihongomate_progress", JSON.stringify(next));
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    if (!name || !email || password.length < 6) {
      notify("Please complete all required fields.");
      return;
    }

    const newUser: UserAccount = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: selectedRole,
      level: null,
      presentLevel: "0",
      onboardingComplete: false,
      country: String(form.get("country") || ""),
      qualification: String(form.get("qualification") || ""),
      experience: String(form.get("experience") || ""),
      proof: String(form.get("proof") || "")
    };

    setUser(newUser);
    saveUser(newUser);

    if (selectedRole === "teacher") {
      setScreen("teacher");
    } else {
      setScreen("level");
    }

    notify("Account created successfully!");
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    const savedUser = localStorage.getItem("nihongomate_user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;

    if (!parsedUser || parsedUser.email !== email || parsedUser.password !== password) {
      notify("Account not found. Please sign up first.");
      return;
    }

    setUser(parsedUser);
    setSelectedRole(parsedUser.role);
    setSelectedLevel((parsedUser.level || "N5") as LevelKey);
    setPresentLevel((parsedUser.presentLevel || "0") as PresentLevel);

    if (parsedUser.role === "teacher") {
      setScreen("teacher");
    } else if (!parsedUser.onboardingComplete) {
      setScreen("level");
    } else {
      setScreen("dashboard");
    }

    notify("Login successful!");
  };

  const continueToDashboard = () => {
    if (!user) return;

    const updated: UserAccount = {
      ...user
    };

    setUser(updated);
    saveUser(updated);

    if (presentLevel === "0") {
      setScreen("dashboard");
      notify("Your learning journey begins!");
    } else {
      setCurrentQuestion(0);
      setUserAnswers([]);
      setTestScore(null);
      setTestPassed(false);
      setTimeLeft(480);
      setScreen("placementTest");
    }
  };

  const logout = () => {
    setUser(null);
    setScreen("home");
    localStorage.removeItem("nihongomate_user");
    localStorage.removeItem("nihongomate_progress");
    setProgress({});
    setLessons(LESSONS.map((lesson) => ({ ...lesson, progress: 0, completed: false })));
    notify("You have logged out.");
  };

  const openLesson = (lessonId: string) => {
    const lesson = LESSONS.find((item) => item.id === lessonId) || null;
    if (!lesson) return;

    setSelectedLesson(lesson);
    setScreen("lesson");
  };

  const markLessonComplete = (lessonId: string) => {
    const nextProgress = { ...progress, [lessonId]: 100 };

    setProgress(nextProgress);
    setLessons((current) =>
      current.map((lesson) =>
        lesson.id === lessonId
          ? {
            ...lesson,
            progress: 100,
            completed: true
          }
          : lesson
      )
    );

    saveProgressState(nextProgress);
    notify("First lesson completed! よくできました!");
    setScreen("dashboard");
  };

  const teacherSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const qualification = String(form.get("qualification") || "").trim();
    const experience = String(form.get("experience") || "").trim();
    const proof = String(form.get("proof") || "").trim();

    if (!user) {
      notify("Please log in before submitting your application.");
      return;
    }

    if (!qualification || !experience || !proof) {
      notify("Please complete all application fields.");
      return;
    }

    const updated: UserAccount = {
      ...user,
      qualification,
      experience,
      proof,
      applicationStatus: "pending_review"
    };

    setUser(updated);
    saveUser(updated);

    notify("Teacher application submitted successfully!");
  };


  const renderSignup = () => (
    <div
      style={{
        ...styles.page,
        background: `
  radial-gradient(ellipse at 10% 15%, #ff8fab 0%, transparent 40%),
  radial-gradient(ellipse at 90% 15%, #b58aff 0%, transparent 42%),
  radial-gradient(ellipse at 85% 90%, #70d6c2 0%, transparent 40%),
  linear-gradient(135deg, #ffb38a 0%, #ff8fa3 45%, #c9a0ff 100%)
`,
        minHeight: "100vh",
        paddingTop: 50,
        paddingBottom: 50
      }}
    >
      <span style={styles.eyebrow}>Create your account</span>
      <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>Welcome to NihongoMate 🌸</h1>
      <p style={{ color: "#77727a" }}>
        Create your account to begin your Japanese learning journey.
      </p>
      <div style={styles.pageCard}>
        <h2 style={{ marginTop: 0 }}>First, choose your account type</h2>

        <div
          className="signupChoices"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 22,
            margin: "30px 0"
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedRole("learner")}
            style={{
              ...styles.choice,
              background: selectedRole === "learner" ? "#fff0ec" : "white",
              border: selectedRole === "learner" ? "2px solid #d9433d" : "1px solid #eee2d8"
            }}
          >
            <strong style={{ display: "block", fontSize: 26, color: "#d9433d", marginBottom: 8 }}>🎓 Learner</strong>
            <span>Learn Japanese through structured lessons.</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("teacher")}
            style={{
              ...styles.choice,
              background: selectedRole === "teacher" ? "#fff0ec" : "white",
              border: selectedRole === "teacher" ? "2px solid #d9433d" : "1px solid #eee2d8"
            }}
          >
            <strong style={{ display: "block", fontSize: 26, color: "#d9433d", marginBottom: 8 }}>👨‍🏫 Teacher</strong>
            <span>Apply to create and teach Japanese lessons.</span>
          </button>
        </div>

        <form onSubmit={handleSignup}>
          <div style={styles.field}>
            <label>Full name</label>
            <input name="name" type="text" placeholder="Enter your full name" required />
          </div>

          <div style={styles.field}>
            <label>Email address</label>
            <input name="email" type="email" placeholder="Enter your email" required />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input name="password" type="password" placeholder="At least 6 characters" minLength={6} required />
          </div>
                    <div style={styles.field}>
            <label>Country</label>
            <select
              name="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              required
            >
              <option value="">Select your country</option>
              {countryOptions.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label>Phone number</label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="text"
                value={
                  countryOptions.find((country) => country.name === selectedCountry)?.code
                    ? `+${getCountryCallingCode(selectedCountry)}`
                    : ""
                }
                placeholder="Code"
                readOnly
                style={{ width: 100 }}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                required
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {selectedRole === "teacher" && (
            <>

              <div style={styles.field}>
                <label>Country</label>

                <div style={{ position: "relative" }}>
                  <select
                    name="country"
                    style={{ color: selectedCountry ? "#333" : "#aaa" }}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="" disabled>Select Country</option>
                    {countryOptions.map((country) => (
                      <option
                        value={country.name}
                        onClick={() => {
                          setSelectedCountry(country.name);
                          setCountryDropdownOpen(false);
                        }}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              <div style={styles.field}>
                <label>Japanese qualification</label>
                <select
                  name="qualification"
                  defaultValue=""
                  style={{ color: "#aaa" }}
                  onChange={(e) => {
                    e.currentTarget.style.color = e.target.value ? "#333" : "#aaa";
                  }}
                >
                  <option value="">Select qualification</option>
                  <option>JLPT N1</option>
                  <option>JLPT N2</option>
                  <option>JLPT N3</option>
                  <option>Japanese language degree</option>
                  <option>Other qualification</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Teaching experience</label>
                <textarea name="experience" rows={3} placeholder="Describe your Japanese teaching experience" />
              </div>

              <div style={styles.field}>
                <label>Proof filename or reference</label>
                <input name="proof" placeholder="Describe your certificate or proof" />
                <small style={{ color: "#77727a", display: "block", marginTop: 8 }}>
                  Demo app only. Real platform needs secure uploads and review.
                </small>
              </div>
            </>
          )}

          <button type="submit" style={{ ...styles.btnPrimary, width: "100%" }}>
            Create My Account →
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18 }}>
          Already have an account?
          <button type="button" onClick={() => setScreen("login")} style={{ ...styles.textLink, marginLeft: 10 }}>
            Log in
          </button>
        </p>

        <button type="button" onClick={() => setScreen("home")} style={{ ...styles.textLink, width: "100%", textAlign: "center" }}>
          ← Back to home
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="page" style={styles.page}>
      <span style={styles.eyebrow}>Welcome back</span>
      <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>Log in to NihongoMate</h1>
      <p style={{ color: "#77727a" }}>Continue your Japanese learning journey.</p>

      <div className="pageCard" style={styles.pageCard}>
        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label>Email address</label>
            <input name="email" type="email" placeholder="Your registered email" required />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" required />
          </div>

          <button type="submit" style={{ ...styles.btnPrimary, width: "100%" }}>
            Log In →
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 18 }}>
          Don&apos;t have an account?
          <button type="button" onClick={() => setScreen("signup")} style={{ ...styles.textLink, marginLeft: 10 }}>
            Create account
          </button>
        </p>

        <button type="button" onClick={() => setScreen("home")} style={{ ...styles.textLink, width: "100%", textAlign: "center" }}>
          ← Back to home
        </button>
      </div>
    </div>
  );

  const renderLevelSelection = () => (
    <div style={styles.page}>
      <span style={styles.eyebrow}>Step 1 · Personalise your journey</span>

      <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>
        What is your current Japanese level?
      </h1>

      <p style={{ color: "#77727a" }}>
        First, select your current Japanese knowledge. Then choose the JLPT
        level you would like to study.
      </p>

      <div style={styles.pageCard}>

        {/* Current Japanese Level Selection */}
        <h2 style={{ marginTop: 0 }}>Select your current level</h2>

        <p style={{ color: "#77727a" }}>
          Select the level that best describes your current Japanese knowledge.
          Choose 0 Knowledge if you are completely new to Japanese.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 12,
            margin: "22px 0"
          }}
        >
          {(["0", "N5", "N4", "N3", "N2", "N1"] as PresentLevel[]).map((level) => {
            const active = presentLevel === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => setPresentLevel(level)}
                style={{
                  padding: "16px",
                  borderRadius: 12,
                  border: active ? "2px solid #6c4ce3" : "1px solid #ddd",
                  background: active ? "#f0ebff" : "#fff",
                  color: "#333",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {level === "0" ? "0 Knowledge" : level}
              </button>
            );
          })}
        </div>

        {/* JLPT Explanation FIRST */}
        <h2 style={{ marginTop: 0 }}>What is the JLPT exam?</h2>

        <p style={{ color: "#77727a", lineHeight: 1.8 }}>
          JLPT stands for Japanese-Language Proficiency Test. It is an
          internationally recognised examination for people learning
          Japanese as a non-native language.
        </p>

        <ul style={{ color: "#77727a", lineHeight: 2, paddingLeft: 18 }}>
          <li>N5 is the easiest level.</li>
          <li>N4 is the next basic level.</li>
          <li>N3 is the intermediate level.</li>
          <li>N2 is the upper-intermediate level.</li>
          <li>N1 is the most advanced level.</li>
        </ul>

        {/* JLPT Level Selection SECOND */}
        <h2 style={{ marginTop: 30 }}>Which JLPT level would you like to learn?</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 12,
          margin: "22px 0"
        }}>
          {Object.keys(LEVELS).map((levelKey) => {
            const level = levelKey as LevelKey;
            const active = selectedLevel === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                style={{
                  padding: "18px 8px",
                  borderRadius: 13,
                  border: active ? "2px solid #d9433d" : "1px solid #eee2d8",
                  background: active ? "#fff0ec" : "white",
                  textAlign: "center"
                }}
              >
                <strong style={{
                  display: "block",
                  fontSize: 28,
                  color: "#d9433d"
                }}>
                  {level}
                </strong>

                <small>{LEVELS[level].name}</small>
              </button>
            );
          })}
        </div>

        {/* Selected Level Description */}
        <div style={{
          background: "#f7eee5",
          borderRadius: 16,
          padding: 20,
          lineHeight: 1.8
        }}>
          <strong>
            {selectedLevel} — {LEVELS[selectedLevel].name}
          </strong>

          <p style={{ marginTop: 8, color: "#77727a" }}>
            {LEVELS[selectedLevel].description}
          </p>
        </div>

        <button
          type="button"
          onClick={continueToDashboard}
          style={{ ...styles.btnPrimary, width: "100%", marginTop: 24 }}
        >
          Continue to My First Lesson →
        </button>

        <button
          type="button"
          onClick={logout}
          style={{
            ...styles.textLink,
            width: "100%",
            textAlign: "center",
            marginTop: 12
          }}
        >
          Log out
        </button>

      </div>
    </div>
  );

  const renderPlacementTest = () => {
    const questions = placementQuestions[presentLevel];

    if (!questions || questions.length === 0) {
      return <div>No placement test is available for this level.</div>;
    }

    const question = questions[currentQuestion];
    const selectedAnswer = userAnswers[currentQuestion];

    const submitPlacementTest = () => {
      const correctCount = questions.reduce(
        (total, item, index) =>
          total + (userAnswers[index] === item.correctAnswer ? 1 : 0),
        0
      );

      const score = correctCount * 10;
      const passed = correctCount >= 5;

      setTestScore(score);
      setTestPassed(passed);

      if (passed && user) {
        const updatedUser = {
          ...user,
          onboardingComplete: true
        };

        setUser(updatedUser);
        saveUser(updatedUser);
      }

      setScreen("testResults");
    };

    const handleNextQuestion = () => {
      if (selectedAnswer === undefined) {
        notify("Please select an answer first.");
        return;
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        submitPlacementTest();

      }
    };

    return (
      <div style={styles.page}>
        <div style={styles.pageCard}>
          <h1>Japanese Placement Test</h1>

          <p>
            Level: {presentLevel} | Time left:{" "}
            {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </p>

          <p>
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <div
            style={{
              height: "8px",
              background: "#eee",
              borderRadius: "10px",
              marginBottom: "25px"
            }}
          >
            <div
              style={{
                height: "8px",
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                background: "#7c4dff",
                borderRadius: "10px"
              }}
            />
          </div>

          <p style={{ color: "#7c4dff" }}>
            {question.category}
          </p>

          <h2>{question.question}</h2>

          <div style={{ display: "grid", gap: "12px" }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const updatedAnswers = [...userAnswers];
                  updatedAnswers[currentQuestion] = index;
                  setUserAnswers(updatedAnswers);
                }}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  border: selectedAnswer === index
                    ? "2px solid #7c4dff"
                    : "1px solid #ddd",
                  background: selectedAnswer === index
                    ? "#f0eaff"
                    : "white",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            style={styles.btnPrimary}
          >
            {currentQuestion === questions.length - 1
              ? "Submit Test"
              : "Next Question"}
          </button>
        </div>
      </div>
    );
  };

  const renderTestResults = () => {
    const passed = testPassed;

    return (
      <div style={styles.page}>
        <div style={styles.pageCard}>
          <h1>{passed ? "Congratulations!" : "Keep Practicing!"}</h1>

          <h2>Your Placement Test Results</h2>

          <p>
            Your level: <strong>{presentLevel}</strong>
          </p>

          <h1 style={{ color: passed ? "#16a34a" : "#dc2626" }}>
            {testScore ?? 0}%
          </h1>

          <p>
            {passed
              ? "You passed the placement test!"
              : "You need at least 50% to pass the test."}
          </p>

          {passed ? (
            <button
              style={styles.btnPrimary}
              onClick={() => {
                setScreen("dashboard");
                notify("Your learning journey begins!");
              }}
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              style={styles.btnPrimary}
              onClick={() => {
                setCurrentQuestion(0);
                setUserAnswers([]);
                setTestScore(null);
                setTestPassed(false);
                setTimeLeft(480);
                setScreen("placementTest");
              }}
            >
              Retake Test
            </button>
          )}
        </div>
      </div>
    );
  };

  const totalProgress = lessons.length
    ? Math.round(lessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0) / lessons.length)
    : 0;

  const renderDashboard = () => {
    const completed = progress["intro"] >= 100;
    const totalCompleted = lessons.filter((lesson) => lesson.completed).length;

    return (
      <div style={styles.page}>
        <div style={{ ...styles.dashboardHeader }}>
          <div>
            <span style={styles.eyebrow}>Your learning space</span>
            <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>こんにちは, {user?.name}! 🌸</h1>
            <p style={{ color: "#77727a" }}>
              Your level: {user?.level || "N5"} · {LEVELS[(user?.level || "N5") as LevelKey].name}
            </p>
          </div>

          <button style={styles.btnSecondary} onClick={logout}>Log Out</button>
        </div>

        <div style={styles.pageCard}>
          <h2 style={{ marginTop: 0 }}>Your first step: Introduction to Japanese</h2>
          <p>{INTRO.detail}</p>

          <div style={{ fontSize: 55, color: "#d9433d", fontWeight: 900, margin: "24px 0" }}>こんにちは</div>

          <p><strong>Konnichiwa</strong> — Hello / Good afternoon</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
            <button
              style={styles.btnSecondary}
              onClick={() => speakJapanese("こんにちは", notify)}
            >
              🔊 Listen to pronunciation
            </button>
            <button style={styles.btnPrimary} onClick={() => openLesson("intro")}>
              {completed ? "Review First Lesson" : "Start First Lesson →"}
            </button>
          </div>
        </div>

        <div style={styles.pageCard}>
          <h2 style={{ marginTop: 0 }}>Your learning progress</h2>
          <p style={{ color: "#77727a" }}>
            {completed ? "Your first introduction is complete. Great work!" : "Your first lesson is waiting for you."}
          </p>

          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: completed ? "100%" : "0%" }} />
          </div>

          <p style={{ color: "#77727a", marginTop: 12 }}>
            {completed ? "1 of 1 introductory lessons completed" : "0 of 1 introductory lessons completed"}
          </p>
        </div>

        <div style={styles.pageCard}>
          <h2 style={{ marginTop: 0 }}>Continue learning</h2>

          <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  border: "1px solid #eee2d8",
                  borderRadius: 14,
                  padding: 16,
                  background: "white"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    style={{ width: 120, height: 70, objectFit: "cover", borderRadius: 12 }}
                  />
                  <div>
                    <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "#77727a" }}>
                      {lesson.category}
                    </div>
                    <strong style={{ display: "block", fontSize: 20 }}>{lesson.title}</strong>
                    <small style={{ color: "#77727a" }}>{lesson.duration} min · {lesson.level}</small>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: "#77727a", fontSize: 12 }}>{lesson.progress || 0}%</span>
                  <button style={styles.btnPrimary} onClick={() => openLesson(lesson.id)}>
                    {lesson.completed ? "Review" : "Start"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.pageCard}>
          <h2 style={{ marginTop: 0 }}>Coming up next</h2>
          <p style={{ color: "#77727a" }}>These lessons are planned for future learning packs.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
            <div style={styles.choice}>
              <strong style={{ display: "block", fontSize: 26, color: "#d9433d" }}>あ い う え お</strong>
              <p>Learn the five Japanese vowel sounds.</p>
              <small>Coming soon</small>
            </div>

            <div style={styles.choice}>
              <strong style={{ display: "block", fontSize: 26, color: "#d9433d" }}>ありがとう</strong>
              <p>Learn everyday Japanese expressions.</p>
              <small>Coming soon</small>
            </div>
          </div>
        </div>

        <button type="button" onClick={() => setScreen("level")} style={{ ...styles.textLink, marginTop: 16 }}>
          Change my Japanese level
        </button>
      </div>
    );
  };

  const renderLesson = () => {
    const lesson = selectedLesson || lessons[0];
    if (!lesson) return null;

    const progressValue = progress[lesson.id] || 0;

    return (
      <div style={styles.page}>
        <div style={styles.pageCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
            <div>
              <span style={styles.eyebrow}>{lesson.level}</span>
              <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>{lesson.title}</h1>
            </div>

            <button style={styles.btnSecondary} onClick={() => setScreen("dashboard")}>← Back to dashboard</button>
          </div>

          <img
            src={lesson.thumbnail}
            alt={lesson.title}
            style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 18, marginTop: 22 }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 24, marginTop: 26 }}>
            <div>
              <p>{lesson.description}</p>

              <div style={{ background: "#f7eee5", borderRadius: 16, padding: 20, marginTop: 22 }}>
                <strong>Remember these three writing systems:</strong>
                <p><strong>Hiragana:</strong> A basic Japanese writing system.</p>
                <p><strong>Katakana:</strong> Often used for foreign-origin words.</p>
                <p><strong>Kanji:</strong> Characters that represent meaning.</p>
              </div>

              <h2 style={{ marginTop: 30 }}>2. Your first three Japanese words</h2>
              <p style={{ color: "#77727a" }}>
                Listen to each word. Read its meaning and become familiar with how it sounds.
              </p>

              {[
                { jp: "こんにちは", romaji: "Konnichiwa", meaning: "Hello / Good afternoon" },
                { jp: "ありがとう", romaji: "Arigatou", meaning: "Thank you" },
                { jp: "はい", romaji: "Hai", meaning: "Yes" }
              ].map((word) => (
                <div
                  key={word.jp}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 14,
                    flexWrap: "wrap",
                    border: "1px solid #eee2d8",
                    borderRadius: 14,
                    padding: 16,
                    margin: "12px 0"
                  }}
                >
                  <div style={{ color: "#d9433d", fontSize: 30, fontWeight: 900 }}>{word.jp}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <strong>{word.romaji}</strong><br />
                    {word.meaning}
                  </div>
                  <button style={styles.btnSecondary} onClick={() => speakJapanese(word.jp, notify)}>🔊 Listen</button>
                </div>
              ))}

              <div style={{ background: "#f7eee5", borderRadius: 16, padding: 20, marginTop: 22 }}>
                <strong>Beginner tip</strong>
                <p style={{ color: "#77727a", marginTop: 8 }}>
                  You do not need to memorise everything today. Listen to the pronunciation and try repeating the words.
                </p>
              </div>
            </div>

            <div>
              <div style={styles.card}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#77727a" }}>
                  Teacher
                </p>
                <h3 style={{ margin: "10px 0 4px" }}>{lesson.teacherName}</h3>
                <p>{lesson.duration} min · {lesson.category}</p>
              </div>

              <div style={{ ...styles.card, marginTop: 18 }}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#77727a" }}>
                  Progress
                </p>

                <div style={{ ...styles.progressBar, marginTop: 12 }}>
                  <div style={{ ...styles.progressFill, width: `${progressValue}%` }} />
                </div>

                <p style={{ color: "#77727a", marginTop: 10 }}>{progressValue}% complete</p>
              </div>

              <button
                type="button"
                onClick={() => markLessonComplete(lesson.id)}
                style={{ ...styles.btnPrimary, width: "100%", marginTop: 18 }}
              >
                Finish My First Lesson ✓
              </button>

              <button type="button" onClick={() => setScreen("dashboard")} style={{ ...styles.textLink, width: "100%", marginTop: 12 }}>
                Return to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVocabulary = () => (
    <div style={styles.page}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <span style={styles.eyebrow}>Vocabulary</span>
          <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>Build your daily Japanese words</h1>
        </div>

        <button style={styles.btnSecondary} onClick={() => setScreen("dashboard")}>← Dashboard</button>
      </div>

      <div style={styles.pageCard}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {vocabulary.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 38, fontWeight: 900, color: "#d9433d", lineHeight: 1.1 }}>{item.jp}</div>
                  <div style={{ fontSize: 13, color: "#77727a", marginTop: 6 }}>{item.kana} · {item.romaji}</div>
                </div>

                <span style={{ ...styles.eyebrow, padding: "6px 8px", fontSize: 10 }}>{item.level}</span>
              </div>

              <div style={{ marginTop: 18, lineHeight: 1.7 }}>
                <div><strong>Meaning:</strong> {item.meaning}</div>
                <div style={{ marginTop: 8 }}><strong>Example:</strong> {item.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeacher = () => (
    <div style={styles.page}>
      {user?.applicationStatus === "pending_review" ? (
        <div
          style={{
            ...styles.pageCard,
            background: "#ffffff",
            border: "1px solid #f0d8cd",
            padding: 40
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: "#563d70",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 22px",
              fontSize: 28,
              fontWeight: 800
            }}
          >
            NM
          </div>

          <span
            style={{
              background: "#ffe0d6",
              color: "#c45c48",
              padding: "9px 18px",
              borderRadius: 30,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1
            }}
          >
            TEACHER APPLICATION
          </span>

          <h1 style={{ fontSize: 38, margin: "22px 0 10px", color: "#342832" }}>
            Application Successfully Submitted
          </h1>

          <p style={{ color: "#716675", fontSize: 16 }}>
            Thank you for applying to teach with NihongoMate, {user?.name}.
          </p>

          <div
            style={{
              background: "linear-gradient(135deg, #ffe6bd, #fff2d8)",
              borderRadius: 20,
              padding: 25,
              marginTop: 30,
              border: "1px solid #f2d5a5"
            }}
          >
            <div style={{ fontSize: 28 }}>⏳</div>
            <h3 style={{ margin: "10px 0 5px", color: "#80552e" }}>
              Application Status
            </h3>
            <strong style={{ color: "#bd7735", fontSize: 18 }}>
              Pending Review
            </strong>
          </div>

          <h2 style={{ marginTop: 35, color: "#423447" }}>
            What happens next?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 15,
              marginTop: 22,
              textAlign: "left"
            }}
          >
            {[
              {
                icon: "📝",
                title: "Application review",
                description: "Our team reviews your application details.",
                color: "#ffe8df"
              },
              {
                icon: "🎓",
                title: "Verification",
                description: "We verify your qualifications and experience.",
                color: "#eee5ff"
              },
              {
                icon: "📩",
                title: "Final decision",
                description: "You'll receive a notification about the result.",
                color: "#dff3e9"
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: item.color,
                  borderRadius: 18,
                  padding: 20
                }}
              >
                <div style={{ fontSize: 30 }}>{item.icon}</div>
                <h3 style={{ color: "#423447", fontSize: 16 }}>
                  {item.title}
                </h3>
                <p style={{ color: "#716675", fontSize: 14, lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #dff4e9, #eaf8f2)",
              border: "1px solid #c6e8d5",
              borderRadius: 18,
              padding: 22,
              marginTop: 28
            }}
          >
            <div style={{ fontSize: 26 }}>🎉</div>
            <strong style={{ color: "#347b59", fontSize: 17 }}>
              Your application was submitted successfully!
            </strong>
            <p style={{ color: "#557667", marginBottom: 0 }}>
              You can return here to check your application status.
                       </p>
          </div>
        </div>
      ) : (
        <>
          <span style={styles.eyebrow}>Teacher application</span>

          <h1 style={{ margin: "18px 0 8px", fontSize: 42 }}>
            Welcome, {user?.name}.
          </h1>

          <div style={styles.pageCard}>
            <h2 style={{ marginTop: 0 }}>
              Complete Your Teacher Application
            </h2>

            <form onSubmit={teacherSubmit} style={{ marginTop: 22 }}>
              <div style={styles.field}>
                <label>Japanese qualification</label>
                <input
                  name="qualification"
                  placeholder="JLPT N1 or N2"
                  required
                />
              </div>

              <div style={styles.field}>
                <label>Teaching experience</label>
                <textarea
                  name="experience"
                  rows={5}
                  placeholder="Describe your teaching background and experience"
                  required
                />
              </div>

              <div style={styles.field}>
                <label>Proof reference</label>
                <input
                  name="proof"
                  placeholder="Certificate, reference, or proof file name"
                  required
                />
              </div>

              <button
                type="submit"
                style={{ ...styles.btnPrimary, width: "100%" }}
              >
                Submit application
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );

  const currentView = useMemo(() => {
    switch (screen) {
      case "signup":
        return renderSignup();
      case "login":
        return renderLogin();
      case "level":
        return renderLevelSelection();
      case "placementTest":
        return renderPlacementTest();
      case "testResults":
        return renderTestResults();
      case "dashboard":
        return renderDashboard();
      case "lesson":
        return renderLesson();
      case "vocabulary":
        return renderVocabulary();
      case "teacher":
        return renderTeacher();
      default:
        return (
          <Home
            styles={styles}
            cardColors={cardColors}
            setScreen={setScreen}
          />
        );
    }
  }, [
    screen,
    user,
    selectedRole,
    selectedLevel,
    lessons,
    progress,
    vocabulary,
    selectedLesson,
    presentLevel,
    currentQuestion,
    userAnswers,
    testScore,
    testPassed,
    timeLeft,
    selectedCountry,
    countryDropdownOpen,
    countrySearch
  ]);

  return (
    <div style={styles.appWrap}>
      {currentView}
      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}
const styles = {
  appWrap: {
    minHeight: "100vh",
    background: "#fffaf6"
  } as React.CSSProperties,

  header: {
    position: "sticky" as const,
    top: 0,
    zIndex: 40,
    background: "rgba(255,255,255,0.92)",
    borderBottom: "1px solid #eee2d8",
    backdropFilter: "blur(8px)"
  },

  nav: {
    maxWidth: 1180,
    margin: "0 auto",
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 22px"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "-0.5px"
  },

  navActions: {
    display: "flex",
    gap: 12,
    alignItems: "center"
  },

  main: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 22px"
  },

  hero: {
    minHeight: 560,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: 42,
    padding: "60px 0 70px"
  },

  eyebrow: {
    display: "inline-block",
    padding: "9px 14px",
    borderRadius: 999,
    background: "#fff0ec",
    color: "#d9433d",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "1.4px",
    textTransform: "uppercase"
  },

  h1: {
    fontSize: "clamp(42px, 5vw, 68px)",
    lineHeight: 1.08,
    letterSpacing: "-2px",
    margin: "16px 0 0"
  },

  lead: {
    marginTop: 18,
    color: "#77727a",
    lineHeight: 1.9,
    fontSize: 17,
    maxWidth: 560
  },

  btnPrimary: {
    border: "none",
    borderRadius: 13,
    padding: "17px 24px",
    minHeight: 58,
    fontSize: 16,
    fontWeight: 800,
    background: "#d9433d",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 7px 16px rgba(217, 67, 61, 0.18)"
  },

  btnSecondary: {
    border: "1px solid #eee2d8",
    borderRadius: 12,
    padding: "13px 19px",
    fontWeight: 700,
    background: "white",
    color: "#29252a",
    cursor: "pointer"
  },

  textLink: {
    border: "none",
    background: "transparent",
    color: "#d9433d",
    fontWeight: 700,
    cursor: "pointer",
    padding: 8
  },

  section: {
    padding: "78px 0",
    borderTop: "1px solid #eee2d8"
  },

  sectionHead: {
    textAlign: "center" as const,
    marginBottom: 34
  },

  art: {
    position: "relative" as const,
    height: 360,
    borderRadius: 28,
    background: "linear-gradient(140deg,#f2c8b9,#f8e6c9,#d8e8dd)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "0 18px 38px rgba(20,15,10,0.08)"
  },

  sun: {
    position: "absolute" as const,
    right: 54,
    top: 42,
    width: 150,
    height: 150,
    borderRadius: "50%",
    background: "#d9433d"
  },

  japaneseText: {
    position: "relative" as const,
    zIndex: 2,
    fontSize: 66,
    fontWeight: 900,
    color: "white",
    textShadow: "0 4px 16px rgba(0,0,0,.22)",
    letterSpacing: 2
  },

  mountain: {
    position: "absolute" as const,
    bottom: -52,
    left: "-10%",
    width: "120%",
    height: 175,
    background: "#527d6d",
    clipPath: "polygon(0 70%,25% 10%,50% 70%,75% 20%,100% 65%,100% 100%,0 100%)"
  },

  card: {
    background: "white",
    border: "1px solid #eee2d8",
    borderRadius: 20,
    padding: 24
  } as React.CSSProperties,

  aboutBox: {
    background: "linear-gradient(135deg, #fce4ec, #fff0e6)",
    borderRadius: 28,
    padding: "36px 32px 28px"
  },

  contactCard: {
    background: "white",
    border: "1px solid #eee2d8",
    borderRadius: 18,
    padding: 22
  },

  footer: {
    background: "white",
    borderTop: "1px solid #eee2d8",
    textAlign: "center" as const,
    color: "#77727a",
    padding: "26px 16px"
  },

  page: {
    width: "100%",
    maxWidth: 1100,
    margin: "45px auto",
    padding: "12px 28px 70px"
  },

  pageCard: {
    width: "100%",
    background: "white",
    border: "1px solid #eee2d8",
    borderRadius: 24,
    padding: "44px 52px",
    marginTop: 30,
    boxShadow: "0 12px 35px rgba(40, 25, 15, 0.05)"
  } as React.CSSProperties,
  field: {
    width: "100%",
    margin: "26px 0"
  } as React.CSSProperties,

  choice: {
    width: "100%",
    minHeight: 150,
    textAlign: "left" as const,
    borderRadius: 18,
    padding: 28,
    color: "#29252a",
    background: "white",
    cursor: "pointer"
  } as React.CSSProperties,

  progressBar: {
    height: 9,
    background: "#eee2d8",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10
  } as React.CSSProperties,

  progressFill: {
    height: "100%",
    background: "#287b5b",
    transition: "width .3s ease"
  } as React.CSSProperties,

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap"
  } as React.CSSProperties,

  toast: {
    position: "fixed" as const,
    left: "50%",
    bottom: 24,
    transform: "translateX(-50%)",
    background: "#29252a",
    color: "white",
    padding: "12px 18px",
    borderRadius: 12,
    zIndex: 200,
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 14px 32px rgba(0,0,0,.2)"
  } as React.CSSProperties
};

export default App;