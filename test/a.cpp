#include <iostream>
#include <vector>
using namespace std;

int add(int a, int b) {
    return a + b;
}

// string convertToString(vector<int> arr) {\tstring result = "[";\n\tfor (int i = 0; i < arr.size(); i++) {\n\t\tif (i == arr.size() - 1) {\n\t\t\tstring s = to_string(arr[i]) + "]"; \n\t\t\tresult = result + s;\n\t\t}\n\t\telse {\n\t\t\tstring s = to_string(arr[i]) + ", ";\n\t\t\tresult = result + s;\n\t\t}\n\t}\n\treturn result;\n}\n
string convertToString(vector<int> arr) {
    string result = "[";
    for (int i = 0; i < arr.size(); i++) {
		cout << arr[i] << endl;
        if (i == arr.size() - 1) {
			string s = to_string(arr[i]) + "]\n"; 
            result = result + s;
        }
        else {
			string s = to_string(arr[i]) + ", ";
            result = result + s;
        }
    }
    return result;
}

vector<int> twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {}; // No solution found
}