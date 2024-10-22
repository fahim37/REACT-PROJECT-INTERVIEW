import React, { useEffect, useState } from "react";
import axios from "axios";
import CoursePagination from "./CoursePagination";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [paginatedCourses, setPaginatedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://itder.com/api/get-course-list"
        );
        setCourses(response.data.courseData);
        setCourseLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courseLoading ? (
          <p>Loading...</p>
        ) : courses.length > 0 ? (
          paginatedCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img src={course.photo} alt={course.course_name} />
                <div className="absolute top-0 left-0 p-2">
                  <h3 className="text-white text-xl font-bold">
                    {course.course_name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-gray-800 text-lg font-semibold mb-2">
                  {course.course_name}
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex text-blue-500 text-md">★★★★★</span>
                  <span className="ml-2 text-gray-600 text-md font-bold">
                    {course.trainer_data.name}
                  </span>
                </div>
                <p className="text-gray-600 text-md mb-4">
                  Course Details{" "}
                  <span className="text-blue-500">Show Details</span>
                </p>
                <hr />
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="line-through text-gray-400 text-sm">
                      Tk {course.regular_price}
                    </span>
                    <span className="text-green-600 text-md font-bold ml-2">
                      -
                      {Math.floor(
                        ((course.regular_price - course.discount_price) /
                          course.regular_price) *
                          100
                      )}
                      %
                    </span>
                    <span className="text-black text-lg font-bold ml-2">
                      Tk {course.discount_price}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
      {courses.length > 0 && (
        <CoursePagination
          items={courses}
          setPaginationItems={setPaginatedCourses}
        />
      )}
    </div>
  );
};

export default Courses;
