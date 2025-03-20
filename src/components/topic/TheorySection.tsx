
interface TheorySectionProps {
  topicTitle: string;
}

export function TheorySection({ topicTitle }: TheorySectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Introduction to {topicTitle}</h2>
        <p className="mb-4">
          {topicTitle} are a fundamental concept in computer science and programming. They are used to store collections of data, and are an important part of most programming languages and algorithms.
        </p>
        
        <h3 className="text-lg font-medium mb-2">Key Concepts</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Basic operations and their time complexities</li>
          <li>Common patterns and techniques</li>
          <li>Optimizing solutions using {topicTitle.toLowerCase()}</li>
          <li>Real-world applications and use cases</li>
        </ul>
        
        <h3 className="text-lg font-medium mb-2">Why Master {topicTitle}?</h3>
        <p>
          Understanding {topicTitle.toLowerCase()} is crucial for solving a wide range of problems efficiently. Strong knowledge in this area will significantly improve your problem-solving skills and prepare you for coding interviews.
        </p>
      </div>
      
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <h3 className="font-medium">Basics and Fundamentals</h3>
            <p className="text-sm text-muted-foreground">Start with the core concepts and basic operations</p>
          </li>
          <li>
            <h3 className="font-medium">Common Techniques</h3>
            <p className="text-sm text-muted-foreground">Learn standard algorithms and approaches</p>
          </li>
          <li>
            <h3 className="font-medium">Advanced Problems</h3>
            <p className="text-sm text-muted-foreground">Practice with complex scenarios and optimizations</p>
          </li>
          <li>
            <h3 className="font-medium">Interview Preparation</h3>
            <p className="text-sm text-muted-foreground">Focus on common interview questions and patterns</p>
          </li>
        </ol>
      </div>
    </div>
  );
}
