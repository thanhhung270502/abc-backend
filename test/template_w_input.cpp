#include <iostream>
#include <fstream>
#include <string>
#include <cmath>
#include <vector>
#include <algorithm>

using namespace std;
#define SEPARATOR "#<ab@17943918#@>#"

// {{ STUDENT_ANSWER }}

// int main() {
// {% for TEST in TESTCASES %}
//    {
//     {{ TEST.extra }};
//     {{ TEST.testcode }};
//    }
//     {% if not loop.last %}cout << SEPARATOR << endl;{% endif %}
// {% endfor %}
//     return 0;
// }

// STUDENT_ANSWER
int add(int a, int b)
{
    return a + b;
}
// END STUDENT_ANSWER

int main()
{
    // TEST_CODE (defined when adding test cases)

    // END TEST_CODE

    // PROCESSING (defined when adding test cases)
    int a, b;
    cin >> a >> b;
    cout << add(a, b) << endl;
    return 0;
    // ENDPROCESSING
}