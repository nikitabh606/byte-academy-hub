
export interface Course {
  id: string;
  title: string;
  description: string;
  steps: CourseStep[];
  totalProblems: number;
  completed?: number;
}

export interface CourseStep {
  id: string;
  title: string;
  description: string;
  completed?: number;
  total: number;
  difficulty?: "easy" | "medium" | "hard";
  problems: Problem[];
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  platform: "leetcode" | "geeksforgeeks" | "codeforces";
  link: string;
  completed?: boolean;
}

export const dsaCourse: Course = {
  id: "dsa-course",
  title: "Byte Academy DSA Course/Sheet",
  description: "This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured manner. The lecture quality is better than what you get in paid courses, the only thing we don't provide is doubt support, but trust me our YouTube video comments resolve that as well, we have a wonderful community of 250K+ people who engage in all of the videos.",
  completed: 132,
  totalProblems: 455,
  steps: [
    {
      id: "step-1",
      title: "Learn the basics",
      description: "Fundamentals of programming and time complexity analysis",
      completed: 0,
      total: 31,
      problems: [
        {
          id: "p1",
          title: "C++ Basics",
          difficulty: "easy",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/c-plus-plus/",
          completed: true
        },
        {
          id: "p2",
          title: "Time and Space Complexity",
          difficulty: "medium",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/",
          completed: false
        },
        {
          id: "p3",
          title: "Analyzing Time and Space Complexity",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/explore/featured/card/recursion-i/256/complexity-analysis/",
          completed: false
        }
      ]
    },
    {
      id: "step-2",
      title: "Learn Important Sorting Techniques",
      description: "Master key sorting algorithms and their applications",
      completed: 0,
      total: 7,
      problems: [
        {
          id: "p4",
          title: "Selection Sort",
          difficulty: "easy",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/selection-sort/",
          completed: false
        },
        {
          id: "p5",
          title: "Bubble Sort",
          difficulty: "easy",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/bubble-sort/",
          completed: false
        },
        {
          id: "p6",
          title: "Insertion Sort",
          difficulty: "easy",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/insertion-sort/",
          completed: false
        },
        {
          id: "p7",
          title: "Merge Sort",
          difficulty: "medium",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/merge-sort/",
          completed: false
        },
        {
          id: "p8",
          title: "Quick Sort",
          difficulty: "medium",
          platform: "geeksforgeeks",
          link: "https://www.geeksforgeeks.org/quick-sort/",
          completed: false
        }
      ]
    },
    {
      id: "step-3",
      title: "Solve Problems on Arrays",
      description: "Tackle array problems of varying difficulty levels",
      difficulty: "hard",
      completed: 27,
      total: 40,
      problems: [
        {
          id: "p9",
          title: "Set Matrix Zeroes",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/set-matrix-zeroes/",
          completed: true
        },
        {
          id: "p10",
          title: "Pascal's Triangle",
          difficulty: "easy",
          platform: "leetcode",
          link: "https://leetcode.com/problems/pascals-triangle/",
          completed: true
        },
        {
          id: "p11",
          title: "Next Permutation",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/next-permutation/",
          completed: true
        },
        {
          id: "p12",
          title: "Kadane's Algorithm",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/maximum-subarray/",
          completed: true
        },
        {
          id: "p13",
          title: "Sort Colors",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/sort-colors/",
          completed: true
        }
      ]
    },
    {
      id: "step-4",
      title: "Binary Search",
      description: "1D, 2D Arrays, Search Space",
      completed: 21,
      total: 32,
      problems: [
        {
          id: "p14",
          title: "Binary Search",
          difficulty: "easy",
          platform: "leetcode",
          link: "https://leetcode.com/problems/binary-search/",
          completed: true
        },
        {
          id: "p15",
          title: "Search in Rotated Sorted Array",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
          completed: true
        },
        {
          id: "p16",
          title: "Find First and Last Position of Element in Sorted Array",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
          completed: false
        },
        {
          id: "p17",
          title: "Search a 2D Matrix",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/search-a-2d-matrix/",
          completed: false
        },
        {
          id: "p18",
          title: "Find Peak Element",
          difficulty: "medium",
          platform: "leetcode",
          link: "https://leetcode.com/problems/find-peak-element/",
          completed: false
        }
      ]
    }
  ]
};

export const topicProblems: { [key: string]: Problem[] } = {
  "arrays": [
    {
      id: "a1",
      title: "Two Sum",
      difficulty: "easy",
      platform: "leetcode",
      link: "https://leetcode.com/problems/two-sum/",
      completed: true
    },
    {
      id: "a2",
      title: "Best Time to Buy and Sell Stock",
      difficulty: "easy",
      platform: "leetcode",
      link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      completed: true
    },
    {
      id: "a3",
      title: "Product of Array Except Self",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/product-of-array-except-self/",
      completed: false
    },
    {
      id: "a4",
      title: "Maximum Subarray",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/maximum-subarray/",
      completed: true
    },
    {
      id: "a5",
      title: "Container With Most Water",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/container-with-most-water/",
      completed: false
    },
    {
      id: "a6",
      title: "Find Minimum in Rotated Sorted Array",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      completed: false
    },
    {
      id: "a7",
      title: "Search in Rotated Sorted Array",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      completed: true
    },
    {
      id: "a8",
      title: "3Sum",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/3sum/",
      completed: false
    },
    {
      id: "a9",
      title: "Merge Intervals",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/merge-intervals/",
      completed: false
    },
    {
      id: "a10",
      title: "Find All Duplicates in an Array",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
      completed: false
    }
  ],
  "binary-search": [
    {
      id: "bs1",
      title: "Binary Search",
      difficulty: "easy",
      platform: "leetcode",
      link: "https://leetcode.com/problems/binary-search/",
      completed: true
    },
    {
      id: "bs2",
      title: "First Bad Version",
      difficulty: "easy",
      platform: "leetcode",
      link: "https://leetcode.com/problems/first-bad-version/",
      completed: true
    },
    {
      id: "bs3",
      title: "Search Insert Position",
      difficulty: "easy",
      platform: "leetcode",
      link: "https://leetcode.com/problems/search-insert-position/",
      completed: true
    },
    {
      id: "bs4",
      title: "Find First and Last Position of Element in Sorted Array",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      completed: false
    },
    {
      id: "bs5",
      title: "Search in Rotated Sorted Array",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      completed: true
    },
    {
      id: "bs6",
      title: "Find Peak Element",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/find-peak-element/",
      completed: false
    },
    {
      id: "bs7",
      title: "Find Minimum in Rotated Sorted Array",
      difficulty: "medium",
      platform: "leetcode",
      link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      completed: false
    },
    {
      id: "bs8",
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      platform: "leetcode",
      link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      completed: false
    }
  ]
};
