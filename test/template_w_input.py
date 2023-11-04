__saved_input__ = input
def input(prompt=''):
    s = __saved_input__(prompt)
    print(s)
    return s

# {{ STUDENT_ANSWER }}
SEPARATOR = "#<ab@17943918#@>#"

# {% for TEST in TESTCASES %}
# {{ TEST.testcode }}
# {% if not loop.last %}
print(SEPARATOR)
# {% endif %}
# {% endfor %}