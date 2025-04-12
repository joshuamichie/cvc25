// ✅ Voter’s Compass 2025 – app.js (static-ready, JSX, Babel-compatible)

// Header component
const Header = () => (
  <header className="text-center mb-8">
    <h1 className="text-3xl font-bold text-blue-900 mb-2">Voter's Compass 2025</h1>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Discover which Canadian political party best aligns with your values based on platform data and polling.
    </p>
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-4 inline-block">
      <p className="text-sm font-medium text-blue-800">Canadian Federal Election: April 28, 2025</p>
    </div>
  </header>
);

// Navigation steps
const Navigation = ({ currentStep, setCurrentStep, totalSteps }) => (
  <nav className="mb-8">
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</div>
      <div className="flex space-x-2">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Back</button>
        )}
        {currentStep < totalSteps && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm text-sm hover:bg-blue-600"
          >Next</button>
        )}
      </div>
    </div>
    <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  </nav>
);

// Slider component
const ValueSlider = ({ issue, value, onChange }) => (
  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between mb-2">
      <label className="block text-sm font-medium text-gray-700">{issue}</label>
      <span className="text-sm text-gray-500">
        {value === -5 ? "Strongly Oppose" :
         value === 0 ? "Neutral" :
         value === 5 ? "Strongly Support" :
         value < 0 ? "Oppose" : "Support"}
      </span>
    </div>
    <input
      type="range"
      min="-5"
      max="5"
      step="1"
      value={value}
      onChange={(e) => onChange(issue, parseInt(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <div className="flex justify-between text-xs text-gray-400 mt-1">
      <span>Strongly Oppose</span>
      <span>Neutral</span>
      <span>Strongly Support</span>
    </div>
  </div>
);

// Step 1: Values Assessment
const ValuesAssessment = ({ userValues, setUserValues }) => {
  const issues = Object.keys(platformsData["Liberal"] || {});
  const handleChange = (issue, newValue) => {
    setUserValues({ ...userValues, [issue]: newValue });
  };

  return (
    <section className="page-transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Where Do You Stand?</h2>
      <p className="text-gray-600 mb-6">
        Adjust the sliders to indicate how strongly you support or oppose each issue.
      </p>
      {issues.map(issue => (
        <ValueSlider
          key={issue}
          issue={issue}
          value={userValues[issue] || 0}
          onChange={handleChange}
        />
      ))}
    </section>
  );
};

// Placeholder steps (to be filled with real components later)
const Placeholder = ({ title }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600">This section will be available soon.</p>
  </div>
);

// 🧠 Main App Component (connects everything)
const App = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [userValues, setUserValues] = React.useState({});

  return (
    <div>
      <Header />
      <Navigation currentStep={currentStep} setCurrentStep={setCurrentStep} totalSteps={3} />
      {currentStep === 1 && <ValuesAssessment userValues={userValues} setUserValues={setUserValues} />}
      {currentStep === 2 && <Placeholder title="Party Platform Viewer" />}
      {currentStep === 3 && <Placeholder title="Results Summary & Compass" />}
    </div>
  );
};
