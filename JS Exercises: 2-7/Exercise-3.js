// 1

var myInformation = {
  'name': 'Lucky Sington Shrestha',
  'address': 'Bhaktapur',
  'emails': ['luckshrestha@gmail.com', 'hi@shresthalucky.com.np'],
  'interests': ['programming', 'design', 'AI'],
  'education': [
    {
      'name': 'Everest English School',
      'enrolledDate': '2001'
    },
    {
      'name': 'Khwopa Higher Secondary School',
      'enrolledDate': '2015'
    },
    {
      'name': 'Khwopa College of Engineering',
      'enrolledDate': '2017'
    }
  ]
}

// 2

myInformation.education.forEach(function (value) {
  console.log('Name: ' + value['name'] + ', Date: ' + value['enrolledDate'])
});